<script setup lang="ts">
import { ref, type Ref } from "vue";
import { isLogged, user } from "../common";

const password: Ref<String> = ref("pass");

function login() {
  alert(isLogged + "login " + user.value + ":" + password.value);
  isLogged.value = true;
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <h3>User</h3>
    <input v-model="user" />
    <h3>Password</h3>
    <input v-model="password" type="password" />
    <br /><br />
    <router-link :to="{ name: 'user' }">
      <button @click="login">Log in</button>
    </router-link>
  </div>
</template>

<style>
@media (min-width: 1024px) {
}
</style>
