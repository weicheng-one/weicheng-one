import { defineStore } from "pinia";
import { initializeApp } from "firebase/app";

export const useInitStore = defineStore("init", () => {
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

  return {
    firebaseInit,
  };
});
