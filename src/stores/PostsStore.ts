import { defineStore } from 'pinia';
import {
  collection,
  getDocs,
  getFirestore,
  where,
  query,
  startAfter,
  orderBy,
  limit
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
  const postsPublishedNumber = ref<number>();
  const postsPublishedStartAt = ref<number>(1);
  const lastVisible = ref<DocumentData>();

  async function postsPublishedGet() {
    const q = query(collection(db, 'posts'), where('status', '==', 'publish'));
    try {
      const querySnapshot = await getDocs(q);
      postsPublished.value = [];
      querySnapshot.forEach((post) => {
        const data = post.data();
        postsPublished.value.unshift({
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
      postsPublished.value.sort((a, b) => {
        return b.date.seconds - a.date.seconds;
      });
      postsPublishedNumber.value = querySnapshot.docs.length;
    } catch (error: any) {
      notificationStore.showNotification(1, error.code, error.message);
    }
  }
  async function postsAllGet() {
    const q = query(collection(db, 'posts'), orderBy('date'));
    try {
      const querySnapshot = await getDocs(q);
      postsAll.value = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        postsAll.value.unshift({
          authorId: data.authorId,
          content: data.content,
          date: data.date,
          excerpt: data.excerpt,
          imageUrl: data.imageUrl,
          modified: data.modified,
          postId: doc.id,
          slug: data.slug,
          status: data.status,
          title: data.title
        });
      });
    } catch (error: any) {
      notificationStore.showNotification(1, error.code, error.message);
    }
  }

  async function postsLoadMore() {
    // Construct a new query starting at this document,
    // get the next 6 posts.
    const next = query(collection(db, 'posts'), startAfter(lastVisible.value), limit(6));
    try {
      const nextPostSnapshots = await getDocs(next);
      nextPostSnapshots.forEach((post) => {
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
      console.log('Read More');
    } catch (error: any) {
      notificationStore.showNotification(1, error.code, error.message);
    }
  }
  return {
    postsPublishedGet,
    postsLoadMore,
    postsAllGet,
    postsPublishedNumber,
    postsPublishedStartAt,
    postsPublished,
    postsAll
  };
});
