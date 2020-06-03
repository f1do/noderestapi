<template>
  <div id="app">

    <b-navbar toggleable="md" type="dark" variant="dark" class="mb-4">

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

              <b-navbar-nav>
                <b-nav-item to="/">Inicio</b-nav-item>
                <b-nav-item to="/about">Acerca</b-nav-item>
                <b-nav-item to="/main">Main</b-nav-item>
              </b-navbar-nav>

              <b-navbar-nav class="ml-auto">
                <label class="text-muted mt-2" v-if="isCurrentlyLogedin" >
                  Bienvenido {{usuario.name}}
                </label>

                <b-nav-item-dropdown text="Ingresar" right v-if="!isCurrentlyLogedin">
                  <b-dropdown-item to="/acceso">Accesar</b-dropdown-item>
                  <b-dropdown-item to="/registro">Registro</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-img-lazy v-if="isCurrentlyLogedin" :src="imageprofile" v-bind="mainProps" rounded="circle" alt="Circle image"></b-img-lazy>
                <b-nav-item-dropdown text="" right v-if="isCurrentlyLogedin">
                  <b-dropdown-item @click="cierraSesion">Cerrar Sesion</b-dropdown-item>
                  <b-dropdown-item href="#">Settings</b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
            </b-collapse>
      </b-navbar>
    <router-view/>
  </div>
</template>


<script>
import { auth } from "@/db/firebase";
import { mapState, mapActions, mapGetters } from "vuex";
export default{
  name:'App',
  data(){
    return{
      imageprofile:require('./assets/male-icon-profile.png'),
      mainProps: { blank: true, blankColor: '#777', width: 40, height: 40, class: 'm1 ml-1' }
    }
  },
  methods:{
    ...mapActions(['cierraSesion'])
  },
  computed:{
    ...mapState(['usuario']),
    isCurrentlyLogedin(){
      return auth.currentUser != null;
    }
  }
}
</scripts>