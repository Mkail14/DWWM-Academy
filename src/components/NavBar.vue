<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useFavoritesStore } from '../stores/favorites'
import '../assets/css/navbar.css'

const favStore = useFavoritesStore()
const isDark = ref(true)
const isScrolled = ref(false)
const menuOpen = ref(false)

const router = useRouter()

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  localStorage.setItem('dwwm-theme', isDark.value ? 'dark' : 'light')
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function onScroll() {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  const saved = localStorage.getItem('dwwm-theme') || 'dark'
  isDark.value = saved === 'dark'
  document.documentElement.setAttribute('data-theme', saved)
  window.addEventListener('scroll', onScroll)
  router.afterEach(closeMenu)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="navbar-float-wrapper" :class="{ scrolled: isScrolled }">

    <!-- ── Desktop : deux pilules ── -->
    <nav class="dwwm-pill navbar-desktop" role="navigation" aria-label="Marque">
      <RouterLink to="/" class="navbar-brand-text">DWWM - Academy</RouterLink>
      <div class="navbar-sep"></div>
      <a href="https://revolut.me/mkail1409" class="nav-donation-link">Faire un don</a>
    </nav>

    <nav class="dwwm-pill navbar-desktop" role="navigation" aria-label="Navigation principale">
      <button class="btn-theme-toggle" @click="toggleTheme" :title="isDark ? 'Mode clair' : 'Mode sombre'">
        {{ isDark ? '🌙' : '☀️' }}
      </button>
      <div class="navbar-sep"></div>
      <RouterLink to="/" class="nav-link-exact">Accueil</RouterLink>
      <RouterLink to="/catalogue" class="nav-link-item">Catalogue</RouterLink>
      <div class="nav-favorites-wrapper">
        <RouterLink to="/favoris" class="nav-link-item">Favoris</RouterLink>
        <span v-if="favStore.count > 0" class="badge-count">{{ favStore.count }}</span>
      </div>
      <RouterLink to="/contact" class="nav-link-item">Contact</RouterLink>
    </nav>

    <!-- ── Mobile : pilule unique avec burger ── -->
    <nav class="dwwm-pill navbar-mobile" role="navigation" aria-label="Navigation">
      <RouterLink to="/" class="navbar-brand-text">DWWM - Academy</RouterLink>

      <div style="display:flex;align-items:center;gap:0.3rem;margin-left:auto;">
        <div v-if="favStore.count > 0" class="badge-count badge-count-mobile">
          {{ favStore.count }}
        </div>
        <button
          class="btn-burger"
          :class="{ 'is-open': menuOpen }"
          @click="toggleMenu"
          :aria-expanded="menuOpen"
          aria-label="Menu"
        >
          <span class="burger-bar"></span>
          <span class="burger-bar"></span>
          <span class="burger-bar"></span>
        </button>
      </div>
    </nav>

    <!-- ── Panneau mobile déroulant ── -->
    <div class="navbar-mobile-panel" :class="{ 'is-open': menuOpen }" role="menu">
      <button class="btn-theme-toggle" @click="toggleTheme" :title="isDark ? 'Mode clair' : 'Mode sombre'" style="align-self:flex-start;margin-bottom:0.25rem;">
        {{ isDark ? '🌙 Mode sombre' : '☀️ Mode clair' }}
      </button>
      <div class="mobile-sep"></div>
      <RouterLink to="/" class="nav-link-exact mobile-link" @click="closeMenu">Accueil</RouterLink>
      <RouterLink to="/catalogue" class="nav-link-item mobile-link" @click="closeMenu">Catalogue</RouterLink>
      <div class="nav-favorites-wrapper" style="width:100%">
        <RouterLink to="/favoris" class="nav-link-item mobile-link" @click="closeMenu">
          Favoris
          <span v-if="favStore.count > 0" class="badge-count" style="position:static;margin-left:4px;">{{ favStore.count }}</span>
        </RouterLink>
      </div>
      <RouterLink to="/contact" class="nav-link-item mobile-link" @click="closeMenu">Contact</RouterLink>
      <div class="mobile-sep"></div>
      <a href="https://revolut.me/mkail1409" class="nav-donation-link">Faire un don</a>
    </div>

  </div>
</template>