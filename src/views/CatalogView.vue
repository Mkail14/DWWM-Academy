<script setup>
import { ref, computed } from 'vue'
import FormationCard from '../components/FormationCard.vue'
import { formations } from '../data/formations'
import '../assets/css/catalog.css'

const search = ref('')
const niveauFilter = ref('')
const prixFilter = ref('')

const filtered = computed(() => {
  return formations.filter(f => {
    const matchSearch = !search.value ||
      f.titre.toLowerCase().includes(search.value.toLowerCase()) ||
      f.description.toLowerCase().includes(search.value.toLowerCase())

    const matchNiveau = !niveauFilter.value || f.niveau === niveauFilter.value

    let matchPrix = true
    if (prixFilter.value === 'lt1000') matchPrix = f.prix < 1000
    else if (prixFilter.value === '1000-1500') matchPrix = f.prix >= 1000 && f.prix <= 1500
    else if (prixFilter.value === 'gt1500') matchPrix = f.prix > 1500

    return matchSearch && matchNiveau && matchPrix
  })
})

function resetFilters() {
  search.value = ''
  niveauFilter.value = ''
  prixFilter.value = ''
}

const hasFilters = computed(() => search.value || niveauFilter.value || prixFilter.value)
</script>

<template>
  <div class="container">
    <div class="catalog-header">
      <h1 class="section-title">Catalogue des formations</h1>
      <div class="divider divider-left"></div>
      <p class="section-subtitle mb-0">
        Découvrez l'ensemble de nos formations disponibles et choisissez celle qui correspond à votre projet.
      </p>
    </div>

    <!-- Filtres -->
    <div class="catalog-filters">
      <span class="filter-label"><i class="bi bi-funnel me-1"></i>Filtrer :</span>

      <input
        v-model="search"
        type="text"
        class="filter-input"
        placeholder="Rechercher une formation..."
      />

      <select v-model="niveauFilter" class="filter-select">
        <option value="">Tous les niveaux</option>
        <option value="Débutant">Débutant</option>
        <option value="Intermédiaire">Intermédiaire</option>
        <option value="Avancé">Avancé</option>
      </select>

      <select v-model="prixFilter" class="filter-select">
        <option value="">Tous les prix</option>
        <option value="lt1000">Moins de 1 000 €</option>
        <option value="1000-1500">1 000 € – 1 500 €</option>
        <option value="gt1500">Plus de 1 500 €</option>
      </select>

      <button v-if="hasFilters" class="filter-btn-reset" @click="resetFilters">
        <i class="bi bi-x-circle me-1"></i>Réinitialiser
      </button>
    </div>

    <p class="catalog-results-count">
      <span>{{ filtered.length }}</span> formation{{ filtered.length !== 1 ? 's' : '' }} trouvée{{ filtered.length !== 1 ? 's' : '' }}
    </p>

    <!-- Grille -->
    <div v-if="filtered.length > 0" class="row g-4 mb-5">
      <div
        v-for="formation in filtered"
        :key="formation.id"
        class="col-sm-6 col-lg-4"
      >
        <FormationCard :formation="formation" />
      </div>
    </div>

    <!-- Vide -->
    <div v-else class="catalog-empty">
      <i class="bi bi-search"></i>
      <h3>Aucune formation trouvée</h3>
      <p class="mt-2">Essayez de modifier vos critères de recherche.</p>
      <button class="btn btn-outline-accent mt-3" @click="resetFilters">
        Réinitialiser les filtres
      </button>
    </div>
  </div>
</template>
