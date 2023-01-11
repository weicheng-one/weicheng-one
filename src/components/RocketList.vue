<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

const query = gql`
  query getRockets {
    rockets {
      id
      name
    }
  }
`;
const { result } = useQuery(query);
</script>

<template>
  <ul v-if="result && result.rockets">
    <li v-for="rocket of result.rockets" :key="rocket.id">
      <RouterLink :to="{ name: 'rocket', params: { id: rocket.id } }">
        <h2>
          {{ rocket.name }}
        </h2>
      </RouterLink>
    </li>
  </ul>
</template>
