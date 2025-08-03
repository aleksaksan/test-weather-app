<script setup lang="ts">
const currentDate = new Date()
const options: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
}
const formattedDate = currentDate.toLocaleDateString('en-US', options)
</script>

<template>
  <div>{{ formattedDate }}</div>
</template>

<style></style>
