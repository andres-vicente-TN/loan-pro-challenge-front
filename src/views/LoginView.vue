<script setup lang="ts">
import { ref, type Ref } from "vue";
import { isLogged, user, type OperationModel } from "../common";
// import axios from "axios";

const password: Ref<String> = ref("pass");

async function login() {
  // try { TODO: Add API call
  //   const { data } = await axios.get("http://localhost:3000/api/v1/costs/", {
  //     headers: {
  //       Authorization: `Basic ${btoa(user.value + ":" + password.value)}`
  //     },
  //   });
  //   alert(data);
  // } catch (error) {
  //   alert(error);
  // }
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
