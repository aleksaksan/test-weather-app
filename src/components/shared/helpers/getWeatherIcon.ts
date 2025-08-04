import { defineAsyncComponent } from 'vue'

const UnknownWeatherIcon = defineAsyncComponent(
  () => import('@/components/icons/UnknownWeatherIcon.vue'),
)
const ClearSkyIcon = defineAsyncComponent(() => import('@/components/icons/ClearSkyIcon.vue'))
const DrizzleIcon = defineAsyncComponent(() => import('@/components/icons/DrizzleIcon.vue'))
const FogIcon = defineAsyncComponent(() => import('@/components/icons/FogIcon.vue'))
const OvercastIcon = defineAsyncComponent(() => import('@/components/icons/OvercastIcon.vue'))
const PartlyCloudlyIcon = defineAsyncComponent(
  () => import('@/components/icons/PartlyCloudlyIcon.vue'),
)
const RainIcon = defineAsyncComponent(() => import('@/components/icons/RainIcon.vue'))
const SnowIcon = defineAsyncComponent(() => import('@/components/icons/SnowIcon.vue'))
const ThunderstormIcon = defineAsyncComponent(
  () => import('@/components/icons/ThunderstormIcon.vue'),
)

export const getWeatherIcon = (statusCode?: number) => {
  switch (statusCode) {
    case 0:
      return ClearSkyIcon
    case 1:
    case 2:
      return PartlyCloudlyIcon
    case 3:
      return OvercastIcon
    case 45:
    case 48:
      return FogIcon
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return DrizzleIcon
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return RainIcon
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return SnowIcon
    case 95:
    case 96:
    case 99:
      return ThunderstormIcon
    default:
      return UnknownWeatherIcon
  }
}
