// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import { getDocs, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsP1F3JYuKG-Lv59Zi2eGYN0zCYDrpuYw",
  authDomain: "regrant.firebaseapp.com",
  projectId: "regrant",
  storageBucket: "regrant.appspot.com",
  messagingSenderId: "981860553903",
  appId: "1:981860553903:web:70053ea4b351c6e528b05a",
  measurementId: "G-E54W3S89JN",
};

if(getApps().length === 0){
  initializeApp(firebaseConfig);
}

const fbApp = getApp();
const fbStorage = getStorage();

/**
* 
* @param {*} uri 
* @param {*} name 
*/

const listFiles = async ()=>{
const storage = getStorage();

// Create a reference under which you want to list
const listRef = ref(storage, 'images');

// Find all the prefixes and items.
const listResp = await listAll(listRef);
return listResp.items
};

const uploadToFirebase = async (uri, name, onprogress)=>{
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();
  
  const imageRef = ref(getStorage(), 'images/' + name);

  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject)=>{
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onprogress && onprogress('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
        reject(error)
      }, 
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata : uploadTask.snapshot.metadata
        })
      }
    );
  });
};

export { fbApp, fbStorage, uploadToFirebase, listFiles };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app);
