import { defineStore } from 'pinia';
import {
  collection,
  getDocs,
  getFirestore,
  where,
  query,
  orderBy,
  limit,
  startAfter
} from 'firebase/firestore';
import { useLocalStorage } from '@vueuse/core';
import { useNotificationStore } from '@/stores/NotificationStore';
import { ref } from 'vue';
import type Post from '@/types/Post';
import type { DocumentData } from 'firebase/firestore';

export const usePostsStore = defineStore('posts', () => {
  const db = getFirestore();
  const notificationStore = useNotificationStore();
  const postsAll = useLocalStorage<Post[]>('posts:postsAll', []);
  const postsPublished = useLocalStorage<Post[]>('posts:postsPublished', []);
  const showBtn = ref<boolean>(false);
  const lastResult = ref<boolean>(false);
  const lastVisible = ref<DocumentData>();

  async function postsPublishedGet() {
    let q = null;
    if (lastVisible.value) {
      q = query(
        collection(db, 'posts'),
        where('status', '==', 'publish'),
        orderBy('date', 'desc'),
        startAfter(lastVisible.value),
        limit(6)
      );
    } else {
      postsPublished.value = [];
      q = query(
        collection(db, 'posts'),
        where('status', '==', 'publish'),
        orderBy('date', 'desc'),
        limit(6)
      );
    }
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((post) => {
        const data = post.data();
        postsPublished.value.push({
          authorId: data.authorId,
          content: data.content,
          date: data.date,
          excerpt: data.excerpt,
          imageUrl: data.imageUrl,
          modified: data.modified,
          postId: post.id,
          slug: data.slug,
          status: data.status,
          title: data.title
        });
      });
      lastVisible.value = querySnapshot.docs[querySnapshot.docs.length - 1];
      if (!lastVisible.value) {
        lastResult.value = true;
      } else {
        showBtn.value = true;
      }
    } catch (error: any) {
      notificationStore.showNotification(1, error.code, error.message);
    }
  }
  async function postsAllGet() {
    const q = query(collection(db, 'posts'), orderBy('date', 'desc'), limit(10));
    try {
      const querySnapshot = await getDocs(q);
      postsAll.value = [];
      querySnapshot.forEach((post) => {
        const data = post.data();
        postsAll.value.push({
          authorId: data.authorId,
          content: data.content,
          date: data.date,
          excerpt: data.excerpt,
          imageUrl: data.imageUrl,
          modified: data.modified,
          postId: post.id,
          slug: data.slug,
          status: data.status,
          title: data.title
        });
      });
    } catch (error: any) {
      notificationStore.showNotification(1, error.code, error.message);
    }
  }
  return {
    postsPublishedGet,
    postsAllGet,
    postsPublished,
    postsAll,
    lastResult,
    showBtn
  };
});
