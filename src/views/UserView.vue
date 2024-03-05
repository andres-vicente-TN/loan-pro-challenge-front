<script setup lang="ts">
import { isLogged, user, loadBalance, balance } from "../common";
import Operation from "../components/Operations.vue";

loadBalance();
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
../components/Operations.vue
