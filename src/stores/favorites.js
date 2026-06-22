import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref(JSON.parse(localStorage.getItem('dwwm-favorites') || '[]'))

  const count = computed(() => favorites.value.length)

  function toggle(formation) {
    const idx = favorites.value.findIndex(f => f.id === formation.id)
    if (idx === -1) {
      favorites.value.push(formation)
    } else {
      favorites.value.splice(idx, 1)
    }
    localStorage.setItem('dwwm-favorites', JSON.stringify(favorites.value))
  }

  function isFavorite(id) {
    return favorites.value.some(f => f.id === id)
  }

  function remove(id) {
    const idx = favorites.value.findIndex(f => f.id === id)
    if (idx !== -1) {
      favorites.value.splice(idx, 1)
      localStorage.setItem('dwwm-favorites', JSON.stringify(favorites.value))
    }
  }

  function clearAll() {
    favorites.value = []
    localStorage.removeItem('dwwm-favorites')
  }

  return { favorites, count, toggle, isFavorite, remove, clearAll }
})
