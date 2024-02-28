<script lang="ts" setup>
import { ref } from "vue";

const value1 = ref();
const value2 = ref();
const result = ref("");
const cost = ref(0.1); // TODO obtain from BE

const operations = {
  addition: { operator: "+", name: "addition", arity: 2 },
  subtraction: { operator: "-", name: "subtraction", arity: 2 },
  multiplication: { operator: "*", name: "multiplication", arity: 2 },
  division: { operator: "/", name: "division", arity: 2 },
  sqrt: { operator: "sqrt", name: "square root", arity: 1 },
  string: {
    operator: "string",
    name: "random string",
    arity: 0,
  },
};
const operation = ref(operations.addition);

function onChange() {
  value1.value = "";
  value2.value = "";
  result.value = "";
}

function calculate() {
  let valid = true;
  if (operation.value.arity == 1 && !value2.value) {
    alert("the value can not be empty");
    valid = false;
  } else if (operation.value.arity == 2 && (!value1.value || !value2.value)) {
    alert("the values can not be empty");
    valid = false;
  }
  if (!valid) {
    return;
  }
  result.value =
    value1.value + " " + operation.value.operator + " " + value2.value;
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
</style>
