<script setup lang="ts">
import { ref, type Ref } from "vue";
import { isLogged, user } from "../common";

function logout() {
  isLogged.value = false;
}
</script>

<template>
  <div>
    <h1>Logout {{ user }}?</h1>
    <router-link :to="{ name: 'login' }">
      <button @click="logout">Confirm</button>
    </router-link>
  </div>
</template>

<style>
@media (min-width: 1024px) {
}
</style>
