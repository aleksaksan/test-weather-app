<script setup lang="ts">
import { useDebounce } from '@/hooks/useDebounce'
import { useSearchPlace } from '@/hooks/useSearchPlace'
import { useClickOutside } from '@/hooks/useClickOutside'
import type { ISearchPlace } from '@/types/ISearchPlaceResponse'
import { ref, defineEmits, watch } from 'vue'

const emit = defineEmits(['place-selected'])

const searchQuery = ref('')
const debouncedSearchQuery = useDebounce(searchQuery)

const { cityList, loading, error, getCityList } = useSearchPlace()
const showDropdown = ref(false)
const selectedPlace = ref<ISearchPlace | null>(null)
const dropdownContainerRef = ref<HTMLElement | null>(null)

watch(debouncedSearchQuery, (newVal) => {
  getCityList(newVal)
  showDropdown.value = !!newVal.trim()
})

function selectPlace(place: ISearchPlace) {
  selectedPlace.value = place
  searchQuery.value = place.name
  emit('place-selected', place.latitude, place.longitude)
  showDropdown.value = false
}

function closeDropdown() {
  showDropdown.value = false
}

useClickOutside(dropdownContainerRef, closeDropdown)
</script>

<template>
  <div>
    <div ref="dropdownContainerRef">
      <input
        v-model="searchQuery"
        @focus="showDropdown = !!searchQuery.trim()"
        placeholder="Search..."
        type="text"
      />

      <div v-if="loading && cityList?.length" class="dropdown loading">Загрузка...</div>
      <div v-else-if="error" class="dropdown error">{{ error }}</div>
      <ul v-else-if="showDropdown && cityList?.length" class="dropdown">
        <li
          v-for="(city, index) in cityList"
          :key="index"
          class="dropdown-item"
          @click="selectPlace(city)"
        >
          {{ city.name }}; {{ city.country }}; {{ city.admin1 }}; {{ city.admin2 }}
          {{ city.admin3 }}; {{ city.admin4 }}
        </li>
      </ul>
      <div v-if="selectedPlace">{{ selectedPlace.name }}: {{ selectedPlace.country }},</div>
    </div>
  </div>
</template>

<style scoped>
input {
  background-color: transparent;
  width: 250px;
  padding: 6px 8px;
  border-radius: 6px;
  display: block;
  color: var(--color-text);
}

.dropdown {
  position: absolute;
  width: 100%;
  max-width: 440px;
  background: var(--vt-c-black);
  border-radius: 8px;
  z-index: 100;
  padding: 4px 0;
  border: 1px solid #eee;
}

.dropdown-item {
  padding: 6px 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: var(--vt-c-black-soft);
}
</style>
