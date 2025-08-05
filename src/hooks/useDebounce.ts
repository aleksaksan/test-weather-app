import { ref, watch, type Ref } from 'vue'

export function useDebounce(value: Ref<string>, delay: number = 300) {
  const debouncedValue = ref(value.value)

  let timeoutId: ReturnType<typeof setTimeout>

  watch(
    value,
    (newValue) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        debouncedValue.value = newValue
      }, delay)
    },
    { immediate: true },
  )

  return debouncedValue
}
