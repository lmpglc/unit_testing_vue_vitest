<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="increment">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
const props = defineProps({ 
  msg: String,
  otra: String
})

const count = ref(0)

const increment = () => {
  count.value++
}

watch(
  ()=>props.msg, 
  (value) => {
    console.log('estamos en el test')
    fetch('https://example.com/' + value)
    console.log('estamos en el test AXIOS')
    axios.get('https://httpbin.org/get')
  },
)

</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
