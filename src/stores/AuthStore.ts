import { defineStore } from "pinia";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useLocalStorage } from "@vueuse/core";
import { useNotificationStore } from "./NotificationStore";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const notificationStore = useNotificationStore();
  const auth = getAuth();
  const user = useLocalStorage("auth:user", auth.currentUser);
  const router = useRouter();

  function signInUser(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        user.value = auth.currentUser;
        router.push({ name: "home" });
        notificationStore.showNotification(
          0,
          "Signed in",
          `Hi ${
            user.value?.displayName
              ? user.value?.displayName
              : user.value?.email
          }, welcome back!`
        );
      })
      .catch((error) => {
        notificationStore.showNotification(1, error.code, error.message);
      });
  }
  function signOutUser() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        user.value = null;
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
