import { defineStore } from "pinia";
import { initializeApp } from "firebase/app";
import { useRouter } from "vue-router";
import { usePostStore } from "@/stores/PostStore";
import {
  collection,
  addDoc,
  getDoc,
  getFirestore,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

export const useFirebaseStore = defineStore("firebase", () => {
  const router = useRouter();
  const postStore = usePostStore();
  const firebaseConfig = {
    apiKey: "AIzaSyDtj8RpneW1SN3zh4lFMzbI_vodV6wZ4i8",
    authDomain: "weicheng-one.firebaseapp.com",
    projectId: "weicheng-one",
    storageBucket: "weicheng-one.appspot.com",
    messagingSenderId: "898063622473",
    appId: "1:898063622473:web:0fde2127105f186b713a98",
    measurementId: "G-5XT6EN8ZBV",
  };
  function firebaseInit() {
    initializeApp(firebaseConfig);
  }

  async function postNew() {
    const docRef = await addDoc(collection(getFirestore(), "posts"), {
      authorId: "",
      status: "draft",
    });
    postStore.id = docRef.id;
    postStore.status = "draft";
    postGet();
    router.push({ name: "post-edit" });
  }

  async function postSave() {
    await updateDoc(doc(getFirestore(), "posts", postStore.id), {
      content: postStore.content,
    });

    console.log(serverTimestamp());
  }
  async function postPublish() {
    if (Object.keys(postStore.date).length === 0) {
      await updateDoc(doc(getFirestore(), "posts", postStore.id), {
        date: serverTimestamp(),
        status: "publish",
      });
      postGet();
    } else {
      await updateDoc(doc(getFirestore(), "posts", postStore.id), {
        status: "publish",
      });
    }
    postStore.status = "publish";
  }
  async function postUpdate() {
    await updateDoc(doc(getFirestore(), "posts", postStore.id), {
      content: postStore.content,
      modified: serverTimestamp(),
    });
  }
  async function postDraft(id: string) {
    await updateDoc(doc(getFirestore(), "posts", postStore.id), {
      status: "draft",
    });
    postStore.status = "draft";
  }
  async function postGet() {
    const docRef = doc(getFirestore(), "posts", postStore.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      postStore.content = docSnap.data().content || "";
      postStore.date = docSnap.data().date || {};
      postStore.slug = docSnap.data().slug || postStore.id;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  return {
    postNew,
    postSave,
    postPublish,
    postUpdate,
    postDraft,
    firebaseInit,
  };
});
