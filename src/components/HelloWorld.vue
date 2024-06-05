<template>
  <TitleComponent 
    v-show="msg"
    :value="prefixedMessage" 
    @on-mounted="handleTitleMounted"
  />

  <div class="card" :class="{ 'card-success': !msg}"
    @click="handleCardClick"
  >
    <button type="button" @click="increment">count is {{ count }}</button>

  </div>

</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
// import axios from 'axios'
import { useAppStore } from '../stores/appStore';
import TitleComponent from './TitleComponent.vue';
import { HelloWorldEmits, HelloWorldProps } from '../models/helloWorld'
 


const props = defineProps<HelloWorldProps>()
const emit = defineEmits<HelloWorldEmits>()

const count = ref(0)

const handleCardClick = () => {
  emit('card-clicked')
} 

const handleTitleMounted = () => {
  emit('up', count.value)
}

const increment = () => {
  count.value++
  console.log(props.msg
  )
}

const prefixedMessage = computed(() => `My Title: ${props.msg}`)

const { changeMessage } = useAppStore()

watch(
  ()=>props.msg, 
  (value) => {
    /*
    // testeamos un fetch    
    fetch('https://example.com/' + value)
    // testeamos el get de axios
    axios.get('https://httpbin.org/get')
    */
    // testeamos un dispatch de pinia
    if(!value){
      return
    }
    changeMessage(value)
  },
)

</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
