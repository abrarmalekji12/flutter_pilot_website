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

// Only the fields the public gallery renders leave this module.
export default async function loadTemplates() {
  await waitForUser();
  const snapshot = await getDocs(collection(db, "templates"));

  return Promise.all(
    snapshot.docs.map(async (doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        description: data.description,
        imageURLs: Array.isArray(data.imageURLs) ? await resolveImageUrls(data.imageURLs) : [],
      };
    })
  );
}
