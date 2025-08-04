<script setup lang="ts">
import HourlyWeather from '@/components/HourlyWeather.vue'
import { inject, type Ref } from 'vue'

const latitude = inject<Ref<number | null> | null>('latitude', null)
const longitude = inject<Ref<number | null> | null>('longitude', null)
</script>

<template>
  <div><HourlyWeather :latitude="latitude" :longitude="longitude" /></div>
</template>
