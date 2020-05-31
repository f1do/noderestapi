<template>
  <b-container>
      <b-card
        overlay
        img-src="https://firebasestorage.googleapis.com/v0/b/intenta-c06ab.appspot.com/o/banner%2FIMG_20190907_163717_Bokeh.jpg?alt=media&token=a02a0e44-d061-4f9d-a73a-fd4e0c32f336"
        img-alt="Card Image"
        text-variant="dark"
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
  object-position: top; /* Center the image within the element */
  width: 100%;
  max-height: 300px;
}
</style>

<script>

export default {
  name: 'Inicio'
}
</script>
