<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import CurrentDate from './components/CurrentDate.vue'
import CurrentWeather from './components/CurrentWeather.vue'
import CurrentLocation from './components/CurrentLocation.vue'
import { provide, ref } from 'vue'
import SearchPlace from './components/SearchPlace.vue'

const latitude = ref<number | null>(null)
const longitude = ref<number | null>(null)

function updateLocation(lat: number, lon: number) {
  latitude.value = lat
  longitude.value = lon
}

//прокидываю пропсы через provide, чтобы опробовать этот метод
provide('latitude', latitude)
provide('longitude', longitude)
</script>

<template>
  <header>
    <div class="wrapper">
      <SearchPlace @place-selected="updateLocation" />
      <CurrentLocation @location-changed="updateLocation" class="left-auto" />
      <CurrentDate />
    </div>
    <div class="flex-container">
      <CurrentWeather :latitude="latitude" :longitude="longitude" class="current-weather" />
      <nav>
        <RouterLink to="/">Current</RouterLink>
        <RouterLink to="/daily">Daily</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  padding: 0.5rem 0;
}

.left-auto {
  margin-left: auto;
  margin-right: 1rem;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.flex-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.current-weather {
  grid-column: 1;
}

nav {
  font-size: 12px;
  text-align: center;
  grid-column: 2;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

main {
  padding: 4rem 0;
}

@media (min-width: 1024px) {
  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
