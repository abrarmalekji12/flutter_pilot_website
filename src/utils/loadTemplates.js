import { collection, getDocs } from "firebase/firestore";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { ref, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "./firebaseconfig";

const waitForUser = () =>
  new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          unsubscribe();
          resolve(user);
        } else {
          signInAnonymously(auth).catch((error) => {
            unsubscribe();
            reject(error);
          });
        }
      },
      (error) => {
        unsubscribe();
        reject(error);
      }
    );
  });

const resolveImageUrls = async (paths) => {
  const urls = await Promise.all(
    paths.map(async (path) => {
      try {
        return await getDownloadURL(ref(storage, path));
      } catch (error) {
        console.error(`Error fetching image for path ${path}:`, error);
        return null;
      }
    })
  );
  return urls.filter(Boolean);
};

const BACKDROPS = ["aurora", "ocean", "sunset", "forest", "graphite", "paper"];
const PRESETS = { hero: [1, 1], trio: [3, 3], fan: [2, 5], collage: [3, 3], responsive: [2, 2] };
const DEFAULT_ASPECT = 9 / 19.5;

const num = (value) => (typeof value === "number" && value > 0 ? value : null);
const aspectOf = (item) => (num(item.width) && num(item.height) ? item.width / item.height : DEFAULT_ASPECT);

const urlFor = async (path) => {
  try {
    return await getDownloadURL(ref(storage, path));
  } catch (error) {
    console.error(`Error fetching image for path ${path}:`, error);
    return null;
  }
};

// Mirrors the Studio's TemplateShowcase.resolve / effectiveFor / pick so the
// website card shows the same screens in the same arrangement.
function pickShowcase(data) {
  const screens = Array.isArray(data.revision?.screens)
    ? data.revision.screens.filter((s) => s && typeof s.id === "string" && typeof s.path === "string" && s.path)
    : [];
  if (!screens.length || (data.formatVersion || 0) < 2) return null;

  const showcase = data.showcase || {};
  let preset = PRESETS[showcase.preset] ? showcase.preset : "trio";
  const byId = new Map(screens.map((s) => [s.id, s]));
  let shots = (Array.isArray(showcase.screenIds) ? showcase.screenIds : []).map((id) => byId.get(id)).filter(Boolean);
  if (!shots.length) shots = screens.slice(0, PRESETS[preset][1]);

  const wide = (s) => aspectOf(s) > 1.05;
  const supports = (name) =>
    name === "responsive" ? shots.some(wide) && shots.some((s) => !wide(s)) : shots.length >= PRESETS[name][0];
  if (!supports(preset)) {
    preset = ["collage", "trio", "fan", "hero"].find((name) => name !== preset && supports(name)) || "hero";
  }
  if (preset === "responsive") {
    const w = shots.find(wide);
    const t = shots.find((s) => s !== w);
    shots = [w, t].filter(Boolean);
  } else {
    shots = shots.slice(0, PRESETS[preset][1]);
  }
  return { preset, backdrop: BACKDROPS.includes(showcase.backdrop) ? showcase.backdrop : "aurora", shots };
}

async function buildPresentation(data) {
  if (typeof data.cover?.path === "string" && data.cover.path) {
    const url = await urlFor(data.cover.path);
    if (url) return { kind: "cover", url };
  }
  const showcase = pickShowcase(data);
  if (showcase) {
    const shots = (
      await Promise.all(
        showcase.shots.map(async (shot) => {
          const url = await urlFor(shot.path);
          return url ? { url, aspect: aspectOf(shot) } : null;
        })
      )
    ).filter(Boolean);
    if (shots.length) return { kind: "showcase", preset: showcase.preset, backdrop: showcase.backdrop, shots };
  }
  return null;
}

// Only the fields the public gallery renders leave this module.
export default async function loadTemplates() {
  await waitForUser();
  const snapshot = await getDocs(collection(db, "templates"));

  const templates = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const data = doc.data();
      // The Studio only lists templates that are published.
      if (data.public === false) return null;
      const presentation = await buildPresentation(data);
      return {
        id: doc.id,
        name: data.name,
        description: data.description,
        platforms: Array.isArray(data.platforms) ? data.platforms.map((p) => String(p).toLowerCase()) : [],
        presentation,
        imageURLs: presentation ? [] : Array.isArray(data.imageURLs) ? await resolveImageUrls(data.imageURLs) : [],
      };
    })
  );
  return templates.filter(Boolean);
}
