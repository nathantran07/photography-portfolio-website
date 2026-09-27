import { getShoot, type Video } from "./portfolio";

export type FilmProject = {
  id: string;
  title: string;
  description: string;
  role: "Filming & editing" | "Editing";
  footageCredit?: string;
  collection?: { slug: string; title: string };
  video: Video;
};

const huracanShoot = getShoot("cars-n-copters-2025");
const huracans = huracanShoot?.videos?.find((video) => video.id === "cnc-video-lambo-3-1-prob4");
if (!huracanShoot || !huracans) throw new Error("films.two-huracans: missing collection video cnc-video-lambo-3-1-prob4");

export const filmProjects: FilmProject[] = [
  { id: "two-huracans", title: "Two Huracans", description: "At the curb in Huntington Beach.", role: "Filming & editing", collection: { slug: huracanShoot.slug, title: huracanShoot.title }, video: huracans },
  {
    id: "first-motors", title: "Koenigsegg Jesko Attack", description: "A closer look at the carbon-and-gold details.", role: "Editing", footageCredit: "Footage by First Motors",
    video: {
      id: "edit-first-motors-video-img-202609262149082", src: "/images/edit-first-motors/video-posters/img-202609262149082.jpg",
      videoSrc: "/videos/edit-first-motors/img-202609262149082.mp4", width: 1080, height: 1920, duration: 17.706,
      alt: "Close-up of a Koenigsegg Jesko Attack headlight, exposed carbon fiber, and gold accents.",
      caption: "Koenigsegg Jesko Attack. Exposed carbon fiber and gold accents, from the headlight surrounds to the ghost emblem. Edited by Nathan Tran using footage from First Motors.",
    },
  },
  {
    id: "rolls-royce", title: "Rolls-Royce", description: "A short Rolls-Royce edit.", role: "Editing",
    video: {
      id: "edit-mixed-sources-video-img-202609262149081", src: "/images/edit-mixed-sources/video-posters/rolls-royce-cover.jpg",
      videoSrc: "/videos/edit-mixed-sources/img-202609262149081.mp4", width: 1080, height: 1920, duration: 18.986,
      alt: "Front view of a Rolls-Royce with illuminated headlights.",
      caption: "A Rolls-Royce montage edited by Nathan Tran. Original footage sources are unidentified.",
    },
  },
  {
    id: "ferrari-bmw", title: "Ferrari / BMW", description: "A Ferrari opening, followed by BMWs after dark.", role: "Editing", footageCredit: "Ferrari footage by WhistlinDiesel",
    video: {
      id: "edit-mixed-sources-video-imgood-6-1-prob4", src: "/images/edit-mixed-sources/video-posters/imgood-6-1-prob4.jpg",
      videoSrc: "/videos/edit-mixed-sources/imgood-6-1-prob4.mp4", width: 1080, height: 1920, duration: 11.566667,
      alt: "Three BMWs parked together at night.",
      caption: "A Ferrari opening followed by a BMW montage, edited by Nathan Tran. Ferrari footage by WhistlinDiesel; BMW footage sources are unidentified.",
    },
  },
];
