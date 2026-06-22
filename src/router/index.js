import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CatalogView from '../views/CatalogView.vue'
import DetailView from '../views/DetailView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import ContactView from '../views/ContactView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/catalogue', name: 'catalogue', component: CatalogView },
  { path: '/formation/:id', name: 'detail', component: DetailView, props: true },
  { path: '/favoris', name: 'favoris', component: FavoritesView },
  { path: '/contact', name: 'contact', component: ContactView }
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})
