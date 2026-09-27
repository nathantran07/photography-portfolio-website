import { shoots, site } from "../content/portfolio";
import { filmProjects } from "../content/films";
import { validateContent } from "../lib/content-validation";

const errors = await validateContent(site, shoots, undefined, filmProjects);
if (errors.length > 0) {
  console.error(`Content validation failed:\n${errors.map((error) => `- ${error}`).join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Content validated: ${shoots.length} shoots, ${shoots.reduce((total, shoot) => total + shoot.photos.length, 0)} photos, ${shoots.reduce((total, shoot) => total + (shoot.videos?.length ?? 0), 0)} collection videos, ${filmProjects.length} homepage films.`);
}
