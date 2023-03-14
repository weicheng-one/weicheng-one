import { defineStore } from 'pinia';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from 'firebase/auth';
import { useNotificationStore } from './NotificationStore';
import { useRouter, useRoute } from 'vue-router';
import type { User } from 'firebase/auth';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const notificationStore = useNotificationStore();
  const auth = getAuth();
  const user = useLocalStorage<User | null>('auth', null);
  const router = useRouter();

  async function signInUser(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      user.value = auth.currentUser;
      router.push({ name: 'home' });
      notificationStore.showNotification(
        0,
        'Signed in',
        `Hi ${user.value?.displayName ? user.value?.displayName : user.value?.email}, welcome back!`
      );
    } catch (error: any) {
      notificationStore.showNotification(1, error.code, error.message);
    }
  }
  async function signOutUser() {
    try {
      await signOut(auth);
      user.value = auth.currentUser;
      router.push({ name: 'home' });
      notificationStore.showNotification(
        0,
        'Successfully logged out',
        'Welcome to log in again to gain full access.'
      );
    } catch (error: any) {
      notificationStore.showNotification(1, error.code, error.message);
    }
  }
  async function forgotPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
      notificationStore.showNotification(
        0,
        'Operation succeeded',
        'The password reset link has been sent to your email. Please click the link in the email to reset your password.'
      );
    } catch (error: any) {
      notificationStore.showNotification(1, error.code, error.message);
    }
  }
  return {
    user,
    signInUser,
    signOutUser,
    forgotPassword
  };
});
