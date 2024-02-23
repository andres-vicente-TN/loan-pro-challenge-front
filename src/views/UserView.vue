<script setup lang="ts">
import { ref, type Ref } from "vue";
import { isLogged, user } from "../common";
import Operation from "../components/Operation.vue";
import Records from "../components/Records.vue";

const balance: number = 15;
</script>

<template>
  <div v-if="isLogged">
    <!-- Balance  -->
    <div>
      <h1>User: {{ user }}</h1>
      <h2>Balance: {{ balance }}</h2>
    </div>
    <hr />
    <Operation />
    <hr />
    <Records />
  </div>
</template>

<style>
@media (min-width: 1024px) {
}

h1 {
  font-weight: 500;
  font-size: 3rem;
}

hr {
  margin-bottom: 2em;
  margin-top: 2em;
}
</style>
