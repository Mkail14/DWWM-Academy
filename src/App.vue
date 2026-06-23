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
      <Transition :name="transitionName" mode="out-in">
        <component :is="Component" :key="$route.path" />
      </Transition>
    </RouterView>
  </main>
  <FooterBar />
</template>

<style>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.slide-left-leave-to   { opacity: 0; transform: translateX(-24px); }
.slide-left-enter-from { opacity: 0; transform: translateX(24px);  }

.slide-right-leave-to   { opacity: 0; transform: translateX(24px);  }
.slide-right-enter-from { opacity: 0; transform: translateX(-24px); }
</style>
