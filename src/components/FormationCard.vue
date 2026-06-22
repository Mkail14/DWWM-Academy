<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useFavoritesStore } from '../stores/favorites'
import '../assets/css/formation-card.css'

const props = defineProps({
  formation: {
    type: Object,
    required: true
  }
})

const favStore = useFavoritesStore()

const isFav = computed(() => favStore.isFavorite(props.formation.id))

function toggleFav(e) {
  e.preventDefault()
  e.stopPropagation()
  favStore.toggle(props.formation)
}

function niveauClass(niveau) {
  if (!niveau) return ''
  const n = niveau.toLowerCase()
  if (n === 'débutant') return 'badge-debutant'
  if (n === 'intermédiaire') return 'badge-intermediaire'
  if (n === 'avancé') return 'badge-avance'
  return ''
}
</script>

<template>
  <div class="formation-card">
    <div class="card-img-wrapper">
      <img :src="formation.image" :alt="formation.titre" loading="lazy" />

      <span v-if="formation.certifiant" class="card-certif-badge">
        <i class="bi bi-patch-check-fill me-1"></i>Certifiant
      </span>

      <button
        class="card-fav-btn"
        :class="{ 'is-favorite': isFav }"
        @click="toggleFav"
        :title="isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'"
        :aria-label="isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'"
      >
        <i :class="isFav ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
      </button>
    </div>

    <div class="card-body-inner">
      <div class="card-top-row">
        <span class="badge-niveau" :class="niveauClass(formation.niveau)">
          {{ formation.niveau }}
        </span>
      </div>

      <h3 class="card-title">{{ formation.titre }}</h3>
      <p class="card-description">{{ formation.description }}</p>

      <div class="card-meta">
        <div class="card-meta-item">
          <i class="bi bi-clock"></i>
          <span>{{ formation.duree }}</span>
        </div>
        <div class="card-meta-item">
          <i class="bi bi-people"></i>
          <span>{{ formation.places }} places</span>
        </div>
      </div>

      <div class="card-footer-inner">
        <div class="card-price">
          {{ formation.prix.toLocaleString('fr-FR') }} €
          <span>/ formation</span>
        </div>
        <RouterLink :to="`/formation/${formation.id}`" class="card-btn-detail">
          Détails <i class="bi bi-arrow-right"></i>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
