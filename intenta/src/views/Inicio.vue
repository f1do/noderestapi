<template>
  <b-container>
      <b-card
        overlay
        :img-src="require('../assets/Inicio/banner.jpg')"
        img-alt="Card Image"
        text-variant="light"
        title="Intenta... Imagina... Realiza"
        sub-title="Logra todos tus objetivos"
        class="thumb-post rounded-5"
      >
        <b-card-text>
          Some quick example text to build on the card and make up the bulk of the card's content.
        </b-card-text>
      </b-card>
  </b-container>
</template>

<style>
.thumb-post img {
  object-fit:cover; /* Do not scale the image */
  object-position: middle; /* Center the image within the element */
  width: 100%;
  max-height: 300px;
}
</style>

<script>

export default {
  name: 'Inicio'
}
</script>
