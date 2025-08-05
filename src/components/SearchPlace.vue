<script setup lang="ts">
import { useDebounce } from '@/hooks/useDebounce'
import { useSearchPlace } from '@/hooks/useSearchPlace'
import type { ISearchPlace } from '@/types/ISearchPlaceResponse'
import { ref, defineEmits, watch } from 'vue'

const emit = defineEmits(['place-selected'])

const searchQuery = ref('')
const debouncedSearchQuery = useDebounce(searchQuery)

const { cityList, loading, error, getCityList } = useSearchPlace()
const showDropdown = ref(false)
const selectedPlace = ref<ISearchPlace | null>(null)

watch(debouncedSearchQuery, (newVal) => {
  getCityList(newVal)
  showDropdown.value = !!newVal.trim()
})

function selectPlace(place: ISearchPlace) {
  selectedPlace.value = place
  showDropdown.value = false
  searchQuery.value = place.name
  emit('place-selected', place.latitude, place.longitude)
}
</script>

<template>
  <div>
    <div>
      <input
        v-model="searchQuery"
        @focus="showDropdown = !!searchQuery.trim()"
        laceholder="Search..."
        type="text"
      />

      <div v-if="loading" class="dropdown loading">Загрузка...</div>
      <div v-else-if="error" class="dropdown error">Ошибка: {{ error }}</div>
      <ul v-else-if="showDropdown && cityList.length" class="dropdown">
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
      <div v-if="selectedPlace" class="selected-place">
        {{ selectedPlace.name }}: {{ selectedPlace.country }},
      </div>
    </div>
  </div>
</template>
