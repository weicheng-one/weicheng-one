<script setup lang="ts">
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

const route = useRoute();
const query = gql`
  query getRocket($id: ID!) {
    rocket(id: $id) {
      id
      name
      description
      costPerLaunch: cost_per_launch
    }
  }
`;
const { result } = useQuery(query, {
  id: route.params.id,
});
</script>

<template>
  <div v-if="result && result.rocket">
    <h2>{{ result.rocket.name }}</h2>
    <h3>{{ result.rocket.description }}</h3>
    <h3>{{ result.rocket.costPerLaunch }}</h3>
  </div>
</template>
