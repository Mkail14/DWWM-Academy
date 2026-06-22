<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'

const PAGE_ORDER = { home: 0, catalogue: 1, detail: 2, favoris: 3, contact: 4 }

const transitionName = ref('slide-left')

const router = useRouter()

router.beforeEach((to, from) => {
  const toIndex = PAGE_ORDER[to.name] ?? 0
  const fromIndex = PAGE_ORDER[from.name] ?? 0
  transitionName.value = toIndex >= fromIndex ? 'slide-left' : 'slide-right'
})
</script>

<template>
  <NavBar />
  <main class="page-wrapper">
    <RouterView v-slot="{ Component }">
      <Transition :name="transitionName">
        <component :is="Component" :key="$route.path" />
      </Transition>
    </RouterView>
  </main>
  <FooterBar />
</template>

<style>
.page-wrapper {
  display: grid;
  overflow: hidden;
  min-height: 100vh;
}

/* Toutes les pages : même cellule grille + couche GPU permanente.
   translate3d(0,0,0) = valeur de repos identique à enter-to / leave-from
   → aucun changement d'état GPU à la fin de la transition = zéro saccade. */
.page-wrapper > * {
  grid-column: 1;
  grid-row: 1;
  transform: translate3d(0, 0, 0);
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

/* Page suivante : entre par la droite, sort par la gauche */
.slide-left-enter-from { transform: translateX(100%); }
.slide-left-enter-to   { transform: translate3d(0, 0, 0); }
.slide-left-leave-from { transform: translate3d(0, 0, 0); }
.slide-left-leave-to   { transform: translateX(-100%); }

/* Page précédente : entre par la gauche, sort par la droite */
.slide-right-enter-from { transform: translateX(-100%); }
.slide-right-enter-to   { transform: translate3d(0, 0, 0); }
.slide-right-leave-from { transform: translate3d(0, 0, 0); }
.slide-right-leave-to   { transform: translateX(100%); }
</style>
