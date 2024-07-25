<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo"/>
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo"/>
    </a>
  </div>
  <HelloWorld :msg="`Vite + Vue ${appState.cout.value}`"/>
</template>
<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {AppState} from "./AppState.ts";
import {ClassState} from "./StateManager/ClassState.ts";
import {onBeforeMount, onMounted} from "vue";

const appState = AppState.instance
let fromGLobalState: AppState | null = null

function storeRes() {
  fromGLobalState = ClassState.statOf<AppState>('appState')
  console.log(fromGLobalState.cout.value)
  fromGLobalState.incrementBy()
  console.log(fromGLobalState.cout.value)
}

onMounted(() => {
  setTimeout(storeRes, 2000)
})
onBeforeMount(() => {
  ClassState.init()
})
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
