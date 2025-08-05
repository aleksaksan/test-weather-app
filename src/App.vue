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
    <nav>
      <RouterLink to="/">Current</RouterLink>
      <RouterLink to="/daily">Daily</RouterLink>
    </nav>
  </header>

  <main>
    <div class="current-weather-wrapper">
      <CurrentWeather :latitude="latitude" :longitude="longitude" class="current-weather" />
    </div>
    <RouterView class="forecast" />
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

nav {
  font-size: 12px;
  text-align: center;
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
  display: flex;
  justify-content: space-around;
}

.current-weather {
  position: sticky;
  top: 6rem;
  word-wrap: normal;
}

.forecast {
  justify-self: start;
}

@media (min-width: 1024px) {
  nav {
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

@media (min-width: 764px) {
  .current-weather {
    font-size: 20px;
  }
}

@media (max-width: 600px) {
  main {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
}
</style>
