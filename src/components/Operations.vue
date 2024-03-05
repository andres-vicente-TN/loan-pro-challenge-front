<script lang="ts" setup>
import axios from "axios";
import { costs, loadBalance, token } from "../common";
import { ref, type Ref } from "vue";
import { url } from "inspector";

const pageSize = 10;
const page = ref(0);

const items: Ref<any[]> = ref([]);
const filteredItems: Ref<any[]> = ref([]);
const selected = ref("");
const filter = ref("");

const value1: Ref<number> = ref(0);
const value2: Ref<number> = ref(0);
const result: Ref<string> = ref("");
const inverseOrder: Ref<boolean> = ref(true);

const operations = {
  addition: { operator: "+", name: "addition", type: "ADD", arity: 2 },
  subtraction: { operator: "-", name: "subtraction", type: "SUB", arity: 2 },
  multiplication: {
    operator: "*",
    name: "multiplication",
    type: "MUL",
    arity: 2,
  },
  division: { operator: "/", name: "division", type: "DIV", arity: 2 },
  sqrt: { operator: "sqrt", name: "square root", type: "SQR", arity: 1 },
  string: {
    operator: "string",
    name: "random string",
    type: "STR",
    arity: 0,
  },
};
const operation = ref(operations.addition);
const cost = ref(costs.value.get(operation.value.type));

loadRecords();

function onChange() {
  value1.value = 0;
  value2.value = 0;
  result.value = "";
  cost.value = costs.value.get(operation.value.type);
}

function isNumeric(value: string | number) {
  return value != null && value !== "" && !isNaN(Number(value.toString()));
}

async function calculate() {
  let valid = true;
  if (operation.value.arity == 1 && !isNumeric(value2.value)) {
    alert("the value must be a number");
    valid = false;
  } else if (
    operation.value.arity == 2 &&
    (!isNumeric(value1.value) || !isNumeric(value2.value))
  ) {
    alert("the values must be numbers");
    valid = false;
  }
  if (!valid) {
    return;
  }
  const body = {
    operator: operation.value.type,
    value1: Number(value1.value),
    value2: Number(value2.value),
  };
  try {
    await axios
      .post(import.meta.env.VITE_API_BASE_URL + "/v1/operations", body, {
        headers: {
          Authorization: `Basic ${token.value}`,
          "Content-Type": "application/json",
        },
      })
      .then((r) => {
        if (r.status == 201) {
          result.value = r.data.operation_response;
          filter.value = "";
          loadBalance();
          loadRecords();
        } else {
          result.value = "- error -";
        }
      });
  } catch (error) {
    alert(error);
  }
}

async function loadRecords() {
  try {
    const url = `${import.meta.env.VITE_API_BASE_URL}/v1/records?skip=${
      Number(page.value) * pageSize
    }&take=${pageSize}&filter=${encodeURIComponent(
      filter.value
    )}&inverseOrder=${inverseOrder.value}`;
    await axios
      .get(url, {
        headers: {
          Authorization: `Basic ${token.value}`,
          "Content-Type": "application/json",
        },
      })
      .then((r) => {
        if (r.status == 200) {
          items.value = r.data;
          filteredItems.value = items.value;
        } else {
          alert(r);
        }
      })
      .catch((e) => {
        alert(e);
      });
  } catch {
    (e: Error) => console.log(e);
  }
}

async function del(id: number) {
  if (id > 0) {
    await axios
      .delete(import.meta.env.VITE_API_BASE_URL + "/v1/records/" + id, {
        headers: {
          Authorization: `Basic ${token.value}`,
          "Content-Type": "application/json",
        },
      })
      .then((r) => loadRecords());
  }
}

function next() {
  if (items.value.length > 0) {
    page.value = page.value + 1;
    loadRecords();
  }
}

function prev() {
  if (page.value > 0) {
    page.value = page.value - 1;
    loadRecords();
  }
}

function setInverseOrder(inverse: boolean) {
  inverseOrder.value = inverse;
  loadRecords();
}
</script>

<template>
  <div>
    <h2>Operation</h2>
    <div style="display: flex">
      <select v-model="operation" style="width: 10em" @change="onChange">
        <option disabled value="">Please select one</option>
        <option v-for="op in operations" :value="op">
          {{ op.name }}
        </option>
      </select>
      <span v-if="operation.arity > 0" style="margin-right: 1em">-></span>
      <input
        v-if="operation.arity == 2"
        v-model="value1"
        style="margin-right: 1em; width: 5em"
      />
      <span v-if="operation.arity > 0">{{ operation.operator }}</span>
      <input
        v-if="operation.arity > 0"
        v-model="value2"
        style="margin-left: 1em; width: 5em"
      />
    </div>
    <span>This operation has a cost of ${{ cost }}</span
    ><br />
    <div style="display: flex; height: 1.5em">
      <button @click="calculate">calculate</button>
      <span style="margin-left: 1em; margin-right: 1em">=</span>
      <textarea
        readonly="true"
        contenteditable="false"
        style="width: 100%; text-align: center"
        >{{ result }}</textarea
      >
    </div>
  </div>
  <br />
  <hr />
  <h3>Records</h3>

  <div style="display: inline-flex; align-items: center">
    <input style="margin-top: 9px" v-model="filter" placeholder="Filter" />
    <button @click="loadRecords">Filter</button>
  </div>
  <div>
    <v-table striped hover :data="filteredItems.values">
      <thead slot="head" style="color: #b88b3e">
        <th style="width: 3em; text-align: left">id</th>
        <th>Operation description</th>
        <th>Operation response</th>
        <th>User balance</th>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <tr v-for="row in filteredItems" :key="row.id">
          <td>{{ row.id }}</td>
          <td>{{ row.description }}</td>
          <td>{{ row.operation_response }}</td>
          <td>{{ row.user_balance }}</td>
          <button @click="del(row.id)">x</button>
        </tr>
      </tbody></v-table
    >
  </div>
  <div class="buttons">
    <button @click="setInverseOrder(false)">↓</button>
    <button @click="setInverseOrder(true)">↑</button>
    <button @click="prev">Prev. Page</button>
    <button @click="next">Next Page</button>
  </div>
</template>

<style>
* {
  font-size: inherit;
}

input {
  display: block;
  margin-bottom: 10px;
}

select {
  float: left;
  margin: 0 1em 1em 0;
  width: 100%;
}

.buttons {
  clear: both;
}

button + button {
  margin-left: 5px;
}

input + button {
  margin-left: 5px;
}
</style>
