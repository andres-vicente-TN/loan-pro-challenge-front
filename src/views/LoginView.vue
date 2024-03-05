<script setup lang="ts">
import { ref, type Ref } from "vue";
import {
  isLogged,
  user,
  token,
  costs,
  loginError,
  type OperationModel,
} from "../common";
import axios from "axios";
import router from "@/router";

const password: Ref<String> = ref("pass");

function loadCosts(costsResponse: OperationModel[]) {
  const map: Map<string, number> = new Map();
  costsResponse.forEach((cost) => map.set(cost.type, cost.cost));
  costs.value = map;
}

async function login() {
  try {
    token.value = btoa(`${user.value}:${password.value}`);
    await axios
      .get(import.meta.env.VITE_API_BASE_URL + "/v1/costs", {
        headers: {
          Authorization: `Basic ${token.value}`,
          "Content-Type": "application/json",
        },
      })
      .then((r) => {
        if (r.status == 200) {
          loadCosts(r.data);
          isLogged.value = true;
          loginError.value = false;
          router.push("user");
        } else {
          isLogged.value = false;
          loginError.value = true;
        }
      })
      .catch((e) => {
        isLogged.value = false;
        loginError.value = true;
      });
  } catch {
    (e: Error) => console.log(e);
  }
}
</script>

<template>
  <div>
    <h1>Login</h1>
    <h3>User</h3>
    <input v-model="user" />
    <h3>Password</h3>
    <input v-model="password" type="password" />
    <span style="color: red" v-if="loginError">Login error</span>
    <br /><br />
    <button @click="login">Log in</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
}
</style>
