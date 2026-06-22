<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFavoritesStore } from '../stores/favorites'
import { formations } from '../data/formations'
import '../assets/css/detail.css'

const route = useRoute()
const router = useRouter()
const favStore = useFavoritesStore()

const formation = computed(() =>
  formations.find(f => f.id === parseInt(route.params.id))
)

const isFav = computed(() =>
  formation.value ? favStore.isFavorite(formation.value.id) : false
)

function toggleFav() {
  if (formation.value) favStore.toggle(formation.value)
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
  <div class="container">

    <div v-if="formation">
      <button class="detail-back-btn" @click="router.back()">
        <i class="bi bi-arrow-left"></i> Retour au catalogue
      </button>

      <div class="row g-4">
        <!-- Colonne principale -->
        <div class="col-lg-8">
          <!-- Image hero -->
          <div class="detail-hero">
            <img :src="formation.image" :alt="formation.titre" />
            <div class="detail-hero-overlay">
              <div class="d-flex gap-2 mb-3 flex-wrap">
                <span class="badge-niveau" :class="niveauClass(formation.niveau)">
                  {{ formation.niveau }}
                </span>
                <span v-if="formation.certifiant" class="badge-niveau" style="background:rgba(240,165,0,0.15);color:var(--accent)">
                  <i class="bi bi-patch-check-fill me-1"></i>Certifiant
                </span>
              </div>
              <h1 class="detail-title">{{ formation.titre }}</h1>
            </div>
          </div>

          <!-- Méta infos -->
          <div class="detail-meta-row">
            <div class="detail-meta-item">
              <i class="bi bi-clock"></i>
              <span>Durée : <strong>{{ formation.duree }}</strong></span>
            </div>
            <div class="detail-meta-item">
              <i class="bi bi-bar-chart-steps"></i>
              <span>Niveau : <strong>{{ formation.niveau }}</strong></span>
            </div>
            <div class="detail-meta-item">
              <i class="bi bi-people"></i>
              <span>Places : <strong>{{ formation.places }}</strong></span>
            </div>
          </div>

          <!-- Description -->
          <div class="detail-section">
            <h2 class="detail-section-title">
              <i class="bi bi-info-circle"></i> Description
            </h2>
            <p class="detail-description">{{ formation.description }}</p>
          </div>

          <!-- Programme -->
          <div class="detail-section">
            <h2 class="detail-section-title">
              <i class="bi bi-list-check"></i> Programme de la formation
            </h2>
            <ul class="programme-list">
              <li v-for="(module, idx) in formation.programme" :key="idx">
                <i class="bi bi-check2-circle"></i>
                {{ module }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Colonne latérale -->
        <div class="col-lg-4">
          <div class="detail-price-card">
            <div class="detail-price-amount">
              {{ formation.prix.toLocaleString('fr-FR') }} €
            </div>
            <div class="detail-price-label">Prix total de la formation</div>

            <ul class="detail-info-list">
              <li>
                <span class="info-key"><i class="bi bi-clock me-2"></i>Durée</span>
                <span class="info-val">{{ formation.duree }}</span>
              </li>
              <li>
                <span class="info-key"><i class="bi bi-bar-chart-steps me-2"></i>Niveau</span>
                <span class="info-val">{{ formation.niveau }}</span>
              </li>
              <li>
                <span class="info-key"><i class="bi bi-people me-2"></i>Places dispo.</span>
                <span class="info-val">{{ formation.places }}</span>
              </li>
              <li>
                <span class="info-key"><i class="bi bi-patch-check me-2"></i>Certifiant</span>
                <span class="info-val">{{ formation.certifiant ? 'Oui' : 'Non' }}</span>
              </li>
            </ul>

            <RouterLink to="/contact" class="btn btn-accent btn-enroll">
              <i class="bi bi-send me-2"></i>S'inscrire à la formation
            </RouterLink>

            <button
              class="btn-fav-detail"
              :class="{ 'is-favorite': isFav }"
              @click="toggleFav"
            >
              <i :class="isFav ? 'bi bi-heart-fill' : 'bi bi-heart'"></i>
              {{ isFav ? 'Retirer des favoris' : 'Ajouter aux favoris' }}
            </button>

            <div v-if="formation.certifiant" class="certif-banner">
              <i class="bi bi-shield-check"></i>
              <span>Cette formation est certifiante et peut être financée via le CPF.</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Formation introuvable -->
    <div v-else class="detail-not-found">
      <i class="bi bi-exclamation-circle"></i>
      <h2 class="section-title">Formation introuvable</h2>
      <p class="text-secondary mt-2">La formation que vous recherchez n'existe pas.</p>
      <RouterLink to="/catalogue" class="btn btn-accent mt-3">
        Retour au catalogue
      </RouterLink>
    </div>

  </div>
</template>
