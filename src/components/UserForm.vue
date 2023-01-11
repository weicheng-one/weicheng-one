<script setup lang="ts">
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@vue/apollo-composable";
import { INSERT_USER } from "../mutations";

const name = ref("");
const twitter = ref("");
const rocket = ref("");
const { mutate: insertUser } = useMutation(INSERT_USER, {
  variables: {
    id: uuidv4(),
    name: name.value,
    twitter: twitter.value,
    rocket: rocket.value,
  },
});
function submit() {
  insertUser();
}
</script>
<template>
  Hello
  <form @submit.prevent="submit">
    <fieldset>
      <input type="text" placeholder="Name" v-model="name" required />
      <input type="text" placeholder="Twitter" v-model="twitter" required />
      <select v-model="rocket" required>
        <option :selectet="true" :value="null">Choose Rocket</option>
        <option
          v-for="name in ['Falcon 1', 'Falcon 9', 'Falcon Heavy']"
          :value="name"
          :key="name"
        >
          {{ name }}
        </option>
      </select>
      <input type="submit" value="Send" />
    </fieldset>
  </form>
</template>
