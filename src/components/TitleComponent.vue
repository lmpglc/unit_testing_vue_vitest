<template>
  <h1>{{ value }}</h1>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { TitleComponentProps, TitleComponentEmits } from '../models/titleComponent'
defineProps<TitleComponentProps>()
const emit = defineEmits<TitleComponentEmits>()

onMounted( ()=> {
  emit('on-mounted')
})
</script>
