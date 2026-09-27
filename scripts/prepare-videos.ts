import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

type Stream = { codec_type: string; codec_name: string; width?: number; height?: number; color_transfer?: string };
type Probe = { streams: Stream[]; format: { duration: string } };
type ExportedVideo = { source: string; sourceSha256: string; id: string; src: string; videoSrc: string; width: number; height: number; duration: number; bytes: number; hasAudio: boolean };

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [sourceDirectory, slug, ...flags] = process.argv.slice(2);
if (!sourceDirectory || !slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("Usage: npm run prepare:videos -- <intake-directory> <shoot-slug>");
const input = path.resolve(sourceDirectory);
const output = path.join(root, "public/videos", slug);
if (input === output || input.startsWith(`${output}${path.sep}`)) throw new Error("Intake must be separate from public video exports.");
if (flags.some((flag) => !["--nvenc", "--resume"].includes(flag))) throw new Error("Supported flags: --nvenc, --resume");
const posters = path.join(root, "public/images", slug, "video-posters");
const artifacts = path.join(root, "artifacts/video-imports");
const encoder = flags.includes("--nvenc") ? ["-c:v", "h264_nvenc", "-preset", "p5", "-cq", "19", "-b:v", "0"] : ["-c:v", "libx264", "-threads", "4", "-preset", "veryfast", "-crf", "19"];
const decoder = flags.includes("--nvenc") ? ["-hwaccel", "cuda"] : ["-threads", "4"];

function run(command: string, args: string[]): string {
  const result = spawnSync(command, args, { encoding: "utf8", windowsHide: true, maxBuffer: 8 * 1024 * 1024, timeout: command === "ffprobe" ? 30000 : 900000 });
  if (result.error || result.status !== 0) throw new Error(`${command}: ${result.error?.message ?? result.stderr}`);
  return result.stdout;
}

function probe(file: string): Probe {
  return JSON.parse(run("ffprobe", ["-v", "error", "-show_streams", "-show_format", "-of", "json", file])) as Probe;
}

await mkdir(output, { recursive: true });
await mkdir(posters, { recursive: true });
await mkdir(artifacts, { recursive: true });
const files = (await readdir(input)).filter((name) => /\.(mov|mp4|m4v)$/i.test(name)).sort();
if (!files.length) throw new Error(`No videos found in ${input}`);
const manifest: ExportedVideo[] = [];
const previous: ExportedVideo[] = flags.includes("--resume") ? JSON.parse(await readFile(path.join(artifacts, `${slug}.json`), "utf8")) as ExportedVideo[] : [];
const ids = new Set<string>();
for (const name of files) {
  const id = path.parse(name).name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  if (ids.has(id)) throw new Error(`Duplicate output name: ${name}`);
  ids.add(id);
  const source = path.join(input, name);
  const sourceSha256 = createHash("sha256").update(await readFile(source)).digest("hex");
  const complete = previous.find((entry) => entry.source === name && entry.sourceSha256 === sourceSha256);
  if (complete) {
    const file = path.join(root, "public", complete.videoSrc);
    if ((await stat(file)).size !== complete.bytes) throw new Error(`Previously exported file changed: ${name}`);
    await stat(path.join(root, "public", complete.src));
    manifest.push(complete);
    console.log(`Reusing ${manifest.length}/${files.length}: ${name}`);
    continue;
  }
  const details = probe(source);
  const video = details.streams.find((stream) => stream.codec_type === "video");
  const seconds = Number(details.format.duration);
  if (!video || !Number.isFinite(seconds) || seconds <= 0) throw new Error(`Invalid video: ${name}`);
  if (video.color_transfer && !["bt709", "unknown"].includes(video.color_transfer)) throw new Error(`Review HDR/color conversion before importing ${name}: ${video.color_transfer}`);
  const destination = path.join(output, `${id}.mp4`);
  const poster = path.join(posters, `${id}.jpg`);
  const stagedVideo = path.join(artifacts, `${slug}-${id}.mp4`);
  const stagedPoster = path.join(artifacts, `${slug}-${id}.jpg`);
  // FFmpeg applies display-matrix orientation before fitting the correct portrait/landscape box.
  const scale = "scale=w='if(gte(iw,ih),min(1920,iw),min(1080,iw))':h='if(gte(iw,ih),min(1080,ih),min(1920,ih))':force_original_aspect_ratio=decrease:force_divisible_by=2:flags=lanczos,setsar=1";
  run("ffmpeg", ["-hide_banner", "-loglevel", "error", "-nostdin", "-y", ...decoder, "-i", source, "-map", "0:v:0", "-map", "0:a:0?", "-map_metadata", "-1", "-map_chapters", "-1", "-vf", `${scale},fps=30`, ...encoder, "-maxrate", "10M", "-bufsize", "20M", "-pix_fmt", "yuv420p", "-tag:v", "avc1", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", stagedVideo]);
  run("ffmpeg", ["-hide_banner", "-loglevel", "error", "-nostdin", "-y", "-ss", String(Math.min(seconds * 0.25, 2)), "-i", stagedVideo, "-frames:v", "1", "-q:v", "2", "-update", "1", stagedPoster]);
  const exported = probe(stagedVideo);
  const frame = exported.streams.find((stream) => stream.codec_type === "video");
  const bytes = (await stat(stagedVideo)).size;
  if (!frame?.width || !frame.height || bytes >= 100 * 1024 * 1024) throw new Error(`Invalid dimensions or file exceeds 100 MiB: ${name}`);
  const hasAudio = exported.streams.some((stream) => stream.codec_type === "audio");
  if (hasAudio !== details.streams.some((stream) => stream.codec_type === "audio")) throw new Error(`Audio stream changed: ${name}`);
  if (Math.abs(Number(exported.format.duration) - seconds) > 0.2) throw new Error(`Duration changed: ${name}`);
  await rename(stagedVideo, destination);
  await rename(stagedPoster, poster);
  manifest.push({ source: name, sourceSha256, id: `${slug}-video-${id}`, src: `/images/${slug}/video-posters/${id}.jpg`, videoSrc: `/videos/${slug}/${id}.mp4`, width: frame.width, height: frame.height, duration: Number(exported.format.duration), bytes, hasAudio });
  await writeFile(path.join(artifacts, `${slug}.json`), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Prepared ${manifest.length}/${files.length}: ${name} (${(bytes / 1024 / 1024).toFixed(1)} MiB)`);
}
console.log(`Prepared ${manifest.length} videos. Review posters and captions before adding records to content/portfolio.ts.`);
