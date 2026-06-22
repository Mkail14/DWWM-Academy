<script setup>
import { ref, reactive } from 'vue'
import '../assets/css/contact.css'

const submitted = ref(false)

const form = reactive({
  nom: '',
  email: '',
  telephone: '',
  sujet: '',
  message: ''
})

const errors = reactive({
  nom: '',
  email: '',
  telephone: '',
  sujet: '',
  message: ''
})

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePhone(phone) {
  return !phone || /^[+\d\s\-().]{6,20}$/.test(phone)
}

function validate() {
  let valid = true

  errors.nom = form.nom.trim().length < 2 ? 'Le nom doit comporter au moins 2 caractères.' : ''
  if (errors.nom) valid = false

  errors.email = !validateEmail(form.email) ? 'Adresse e-mail invalide.' : ''
  if (errors.email) valid = false

  errors.telephone = !validatePhone(form.telephone) ? 'Numéro de téléphone invalide.' : ''
  if (errors.telephone) valid = false

  errors.sujet = !form.sujet ? 'Veuillez choisir un sujet.' : ''
  if (errors.sujet) valid = false

  errors.message = form.message.trim().length < 10 ? 'Le message doit comporter au moins 10 caractères.' : ''
  if (errors.message) valid = false

  return valid
}

function submitForm() {
  if (validate()) {
    submitted.value = true
  }
}

function resetForm() {
  Object.assign(form, { nom: '', email: '', telephone: '', sujet: '', message: '' })
  Object.assign(errors, { nom: '', email: '', telephone: '', sujet: '', message: '' })
  submitted.value = false
}
</script>

<template>
  <div class="container">
    <div class="contact-header">
      <h1 class="section-title">Contactez-nous</h1>
      <div class="divider divider-left"></div>
      <p class="section-subtitle mb-0">
        Une question sur nos formations ? Notre équipe vous répond dans les plus brefs délais.
      </p>
    </div>

    <div class="row g-4 mb-5">
      <!-- Formulaire -->
      <div class="col-lg-7">
        <div class="contact-form-card">
          <h3><i class="bi bi-envelope-paper me-2" style="color:var(--accent)"></i>Envoyer un message</h3>

          <!-- Succès -->
          <div v-if="submitted" class="contact-success">
            <i class="bi bi-check-circle-fill success-icon"></i>
            <h3>Message envoyé !</h3>
            <p>Merci <strong>{{ form.nom }}</strong>, nous avons bien reçu votre message et reviendrons vers vous sous 48h.</p>
            <button class="btn btn-accent" @click="resetForm">
              <i class="bi bi-plus-circle me-2"></i>Nouveau message
            </button>
          </div>

          <!-- Formulaire -->
          <form v-else @submit.prevent="submitForm" novalidate>
            <div class="row g-3">
              <div class="col-sm-6">
                <div class="form-group">
                  <label class="form-label-custom">Nom complet <span style="color:#ef4444">*</span></label>
                  <input
                    v-model="form.nom"
                    type="text"
                    class="form-control-custom"
                    :class="{ 'is-error': errors.nom }"
                    placeholder="Jean Dupont"
                  />
                  <div v-if="errors.nom" class="form-error-msg">
                    <i class="bi bi-exclamation-circle"></i> {{ errors.nom }}
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="form-group">
                  <label class="form-label-custom">Adresse e-mail <span style="color:#ef4444">*</span></label>
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control-custom"
                    :class="{ 'is-error': errors.email }"
                    placeholder="jean@exemple.fr"
                  />
                  <div v-if="errors.email" class="form-error-msg">
                    <i class="bi bi-exclamation-circle"></i> {{ errors.email }}
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="form-group">
                  <label class="form-label-custom">Téléphone</label>
                  <input
                    v-model="form.telephone"
                    type="tel"
                    class="form-control-custom"
                    :class="{ 'is-error': errors.telephone }"
                    placeholder="+262 639 94 11 01"
                  />
                  <div v-if="errors.telephone" class="form-error-msg">
                    <i class="bi bi-exclamation-circle"></i> {{ errors.telephone }}
                  </div>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="form-group">
                  <label class="form-label-custom">Sujet <span style="color:#ef4444">*</span></label>
                  <select
                    v-model="form.sujet"
                    class="form-control-custom"
                    :class="{ 'is-error': errors.sujet }"
                  >
                    <option value="">Choisir un sujet…</option>
                    <option value="inscription">Inscription à une formation</option>
                    <option value="info">Demande d'informations</option>
                    <option value="financement">Financement / CPF</option>
                    <option value="partenariat">Partenariat entreprise</option>
                    <option value="autre">Autre</option>
                  </select>
                  <div v-if="errors.sujet" class="form-error-msg">
                    <i class="bi bi-exclamation-circle"></i> {{ errors.sujet }}
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-group">
                  <label class="form-label-custom">Message <span style="color:#ef4444">*</span></label>
                  <textarea
                    v-model="form.message"
                    class="form-control-custom"
                    :class="{ 'is-error': errors.message }"
                    placeholder="Décrivez votre demande..."
                    rows="5"
                  ></textarea>
                  <div v-if="errors.message" class="form-error-msg">
                    <i class="bi bi-exclamation-circle"></i> {{ errors.message }}
                  </div>
                </div>
              </div>

              <div class="col-12">
                <button type="submit" class="btn btn-accent btn-submit">
                  <i class="bi bi-send me-2"></i>Envoyer le message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Infos de contact -->
      <div class="col-lg-5">
        <div class="contact-info-card">
          <h3><i class="bi bi-info-circle me-2" style="color:var(--accent)"></i>Nos coordonnées</h3>

          <div class="contact-info-item">
            <div class="contact-info-icon"><i class="bi bi-geo-alt-fill"></i></div>
            <div class="contact-info-text">
              <h5>Adresse</h5>
              <p>Rue de la Formation, Mamoudzou<br>Mayotte – 97600</p>
            </div>
          </div>

          <div class="contact-info-item">
            <div class="contact-info-icon"><i class="bi bi-telephone-fill"></i></div>
            <div class="contact-info-text">
              <h5>Téléphone</h5>
              <p>+262 639 94 11 01</p>
            </div>
          </div>

          <div class="contact-info-item">
            <div class="contact-info-icon"><i class="bi bi-envelope-fill"></i></div>
            <div class="contact-info-text">
              <h5>E-mail</h5>
              <p>contact@dwwm-academy.yt</p>
            </div>
          </div>

          <div class="contact-info-item">
            <div class="contact-info-icon"><i class="bi bi-clock-fill"></i></div>
            <div class="contact-info-text">
              <h5>Horaires d'ouverture</h5>
              <p>Lundi – Vendredi : 08h00 – 17h00<br>Samedi : 09h00 – 12h00</p>
            </div>
          </div>

          <div class="contact-map">
            <span><i class="bi bi-map me-2"></i>Carte – Trévani, Mayotte</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
