import { defineStore } from "pinia";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNotificationStore } from "./NotificationStore";
import { useLocalStorage } from "@vueuse/core";
import { useRouter } from "vue-router";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const notificationStore = useNotificationStore();
  const auth = ref(getAuth());
  const user = useLocalStorage("auth:user", { ...auth.value.currentUser });
  const router = useRouter();

  function signInUser(email: string, password: string) {
    signInWithEmailAndPassword(auth.value, email, password)
      .then(() => {
        user.value = { ...auth.value.currentUser };
        router.push({ name: "home" });
        notificationStore.showNotification(
          0,
          "Signed in",
          `Hi ${
            auth.value.currentUser?.displayName
              ? auth.value.currentUser?.displayName
              : auth.value.currentUser?.email
          }, welcome back!`
        );
      })
      .catch((error) => {
        notificationStore.showNotification(1, error.code, error.message);
      });
  }
  function signOutUser() {
    signOut(auth.value)
      .then(() => {
        user.value = {};
        notificationStore.showNotification(
          0,
          "Sign-out successful.",
          "See you next time!"
        );
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }
  return {
    auth,
    user,
    signInUser,
    signOutUser,
  };
});
