<script setup>
import { RouterLink } from 'vue-router'
import '../assets/css/footer.css'
</script>

<template>
  <footer class="dwwm-footer">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-4">
          <div class="footer-brand">DWWM Academy</div>
          <p class="footer-tagline">
            Centre de formation professionnelle spécialisé dans les métiers du numérique à Mayotte.
          </p>
          <div class="footer-socials mt-3">
            <a href="" title="LinkedIn"><i class="bi bi-linkedin"></i></a>
            <a href="" title="GitHub"><i class="bi bi-github"></i></a>
            <a href="" title="Twitter / X"><i class="bi bi-twitter-x"></i></a>
            <a href="" title="Facebook"><i class="bi bi-facebook"></i></a>
          </div>
        </div>

        <div class="col-sm-6 col-lg-2">
          <div class="footer-title">Navigation</div>
          <ul class="footer-links">
            <li><RouterLink to="/">Accueil</RouterLink></li>
            <li><RouterLink to="/catalogue">Catalogue</RouterLink></li>
            <li><RouterLink to="/favoris">Mes favoris</RouterLink></li>
            <li><RouterLink to="/contact">Contact</RouterLink></li>
          </ul>
        </div>

        <div class="col-sm-6 col-lg-3">
          <div class="footer-title">Formations populaires</div>
          <ul class="footer-links">
            <li><RouterLink to="/formation/1">DWWM</RouterLink></li>
            <li><RouterLink to="/formation/3">Vue.js & Nuxt</RouterLink></li>
            <li><RouterLink to="/formation/6">DevOps & AWS</RouterLink></li>
            <li><RouterLink to="/formation/8">Cybersécurité</RouterLink></li>
          </ul>
        </div>

        <div class="col-lg-3">
          <div class="footer-title">Contact</div>
          <div class="footer-contact-item">
            <i class="bi bi-geo-alt"></i>
            Mamoudzou, Mayotte 97600
          </div>
          <div class="footer-contact-item">
            <i class="bi bi-telephone"></i>
            +262 639 00 00 00
          </div>
          <div class="footer-contact-item">
            <i class="bi bi-envelope"></i>
            contact@dwwm-academy.yt
          </div>
          <div class="footer-contact-item">
            <i class="bi bi-clock"></i>
            Lun–Ven : 08h00–17h00
          </div>
        </div>
      </div>

      <hr class="footer-divider" />

      <div class="footer-bottom">
        <span>© 2025 DWWM Academy – Aloalo Mayotte Compétences. Tous droits réservés.</span>
        <span>Réalisé avec Vue.js 3 &amp; Bootstrap 5</span>
      </div>
    </div>
  </footer>
</template>
