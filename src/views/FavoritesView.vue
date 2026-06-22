<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useFavoritesStore } from '../stores/favorites'
import FormationCard from '../components/FormationCard.vue'
import '../assets/css/favorites.css'

const favStore = useFavoritesStore()

const totalPrice = computed(() =>
  favStore.favorites.reduce((sum, f) => sum + f.prix, 0)
)
</script>

<template>
  <div class="container">
    <div class="favorites-header">
      <div class="favorites-count-badge">
        <i class="bi bi-heart-fill"></i>
        {{ favStore.count }} favori{{ favStore.count !== 1 ? 's' : '' }}
      </div>
      <h1 class="section-title">Mes formations favorites</h1>
      <div class="divider divider-left"></div>
      <p class="section-subtitle mb-0">
        Retrouvez ici toutes les formations que vous avez sauvegardées pour les consulter ultérieurement.
      </p>
    </div>

    <!-- Contenu si favoris présents -->
    <div v-if="favStore.count > 0">
      <!-- Résumé -->
      <div class="favorites-summary">
        <div class="summary-total">
          Budget total estimé : <strong>{{ totalPrice.toLocaleString('fr-FR') }} €</strong>
        </div>
        <button class="favorites-clear-btn" @click="favStore.clearAll()">
          <i class="bi bi-trash3"></i> Tout supprimer
        </button>
      </div>

      <!-- Grille de cartes -->
      <div class="row g-4 mb-5">
        <div
          v-for="formation in favStore.favorites"
          :key="formation.id"
          class="col-sm-6 col-lg-4"
        >
          <FormationCard :formation="formation" />
        </div>
      </div>
    </div>

    <!-- État vide -->
    <div v-else class="favorites-empty">
      <i class="bi bi-heart empty-icon"></i>
      <h2>Aucun favori pour l'instant</h2>
      <p>
        Parcourez notre catalogue et cliquez sur le cœur
        pour sauvegarder les formations qui vous intéressent.
      </p>
      <RouterLink to="/catalogue" class="btn btn-accent btn-lg px-5">
        <i class="bi bi-grid me-2"></i>Découvrir les formations
      </RouterLink>
    </div>
  </div>
</template>
