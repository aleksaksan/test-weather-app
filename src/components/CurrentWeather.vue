<script setup lang="ts">
import { useCurrentWeather } from '@/hooks/useCurrentWeather'
const props = defineProps<{
  latitude: number | null
  longitude: number | null
}>()

const { curData, error, loading } = useCurrentWeather(props.latitude, props.longitude)
console.log(curData)
</script>

<template>
  <div v-if="error">
    {{ error }}
  </div>
  <div v-else>{{ curData }}</div>
</template>

<style></style>
