<script setup lang="ts">
import { useCurrentWeather } from '@/hooks/useCurrentWeather'
import { toRef } from 'vue'
const props = defineProps<{
  latitude: number | null
  longitude: number | null
}>()
const latitude = toRef(props, 'latitude')
const longitude = toRef(props, 'longitude')

const { curData, error, loading } = useCurrentWeather(latitude, longitude)
console.log(curData)
</script>

<template>
  <div v-if="error">
    {{ error }}
  </div>
  <div v-else>{{ curData }}</div>
</template>

<style></style>
