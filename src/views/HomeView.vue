<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import FormationCard from '../components/FormationCard.vue'
import { formations } from '../data/formations'
import '../assets/css/home.css'

const featured = computed(() => formations.slice(0, 3))

const currentSlide = ref(0)
const leavingSlide = ref(-1)
const slides = ['https://images.pexels.com/photos/7172094/pexels-photo-7172094.jpeg', 'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg', 'https://www.cefii.fr/blog/wp-content/uploads/2023/09/formations-webdesign-developpement-1080x675.jpg']
let timer = null
let leaveTimer = null

function switchTo(n) {
  if (n === currentSlide.value) return
  leavingSlide.value = currentSlide.value
  currentSlide.value = n
  clearTimeout(leaveTimer)
  leaveTimer = setTimeout(() => { leavingSlide.value = -1 }, 550)
}

function goTo(n) {
  switchTo(n)
  resetTimer()
}

function next() {
  switchTo((currentSlide.value + 1) % slides.length)
}

function resetTimer() {
  clearInterval(timer)
  timer = setInterval(next, 5000)
}

onMounted(() => { timer = setInterval(next, 5000) })
onUnmounted(() => { clearInterval(timer); clearTimeout(leaveTimer) })
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero-section min-vh-100">
      <div class="bloc_acceuil container-fluid m-5">
        <div class="row align-items-center g-5">
          <div class="col-lg-6">
            <div class="hero-label">Centre de formation – Mayotte</div>
            <h1 class="hero-title "> Le monde de demain <span>le numérique à Mayotte</span></h1>
            <p class="hero-subtitle">Rejoignez nos formations en développement web, cybersécurité, design et bien plus encore.</p>

            <div class="d-flex gap-3 flex-wrap">
                  <RouterLink to="/catalogue" id="btn_acceuil" class="btn btn-accent btn-lg px-4">Voir nos formations <i class="bi bi-arrow-right ms-2"></i></RouterLink>
                  <RouterLink to="/contact" class="btn btn-outline-accent btn-lg px-4" id="contact">Contacter nous</RouterLink>
            </div>


            
          </div>
          <div class="col-lg-6 d-none d-lg-block">
            <div class="hero-image-wrapper">
                <div class="slider">

                  <img v-for="(src, i) in slides" :key="i" :src="src" :class="['slide', { active: i === currentSlide, leaving: i === leavingSlide }]" alt="Formation DWWM Academy"/>
                  <div class="slider-dots">
                       <button v-for="(_, i) in slides":key="i" :class="['slider-dot', { active: i === currentSlide }]" @click="goTo(i)" />
                  </div>

                </div>
          </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Présentation du centre -->
    <section class="center-info-section min-vh-100">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="section-title">Notre centre de formation</h2>
          <div class="divider"></div>
          <p class="section-subtitle">
            Aloalo Mayotte Compétences – votre partenaire pour l'insertion professionnelle dans le numérique
          </p>
        </div>

        <div class="row g-4">
          <div class="col-sm-6 col-lg-3">
            <div class="info-card">
              <div class="info-icon"><i class="bi bi-mortarboard-fill"></i></div>
              <h4>Formations certifiantes</h4>
              <p>Des parcours reconnus par l'État, éligibles au CPF, pour booster votre carrière.</p>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3">
            <div class="info-card">
              <div class="info-icon"><i class="bi bi-people-fill"></i></div>
              <h4>Petits groupes</h4>
              <p>Effectifs limités à 15 apprenants maximum pour un suivi personnalisé et efficace.</p>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3">
            <div class="info-card">
              <div class="info-icon"><i class="bi bi-laptop-fill"></i></div>
              <h4>Pratique avant tout</h4>
              <p>80% de pratique en atelier, sur des projets réels pour construire un portfolio solide.</p>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3">
            <div class="info-card">
              <div class="info-icon"><i class="bi bi-briefcase-fill"></i></div>
              <h4>Insertion professionnelle</h4>
              <p>Accompagnement au placement en entreprise grâce à notre réseau de partenaires.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Formations à la une -->
    <section class="featured-section">
      <div class="container">
        <div class="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-3">
          <div>
            <h2 class="section-title">Formations populaires</h2>
            <div class="divider divider-left"></div>
          </div>
          <RouterLink to="/catalogue" class="btn btn-outline-accent">
            Voir tout le catalogue <i class="bi bi-arrow-right ms-1"></i>
          </RouterLink>
        </div>

        <div class="row g-4">
          <div
            v-for="formation in featured"
            :key="formation.id"
            class="col-md-6 col-lg-4"
          >
            <FormationCard :formation="formation" />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-box">
          <h2 class="txt-fin">Prêt à démarrer votre parcours ?</h2>
          <p>Inscrivez-vous dès aujourd'hui ou contactez-nous pour obtenir plus d'informations sur nos formations.</p>
          <div class="d-flex justify-content-center gap-3 flex-wrap">
            <RouterLink id="formation" to="/catalogue" class="btn btn-accent btn-lg px-5">
              <i class="bi bi-grid me-2"></i>Voir les formations
            </RouterLink>
            <RouterLink to="/contact" class="btn btn-outline-accent btn-lg px-5">
              <i class="bi bi-envelope me-2"></i>Nous écrire
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
