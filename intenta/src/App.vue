<template>
  <div id="app">

    <b-navbar toggleable="md" type="dark" variant="dark" class="mb-4">

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>

              <b-navbar-nav>
                <b-nav-item to="/">Inicio</b-nav-item>
                <b-nav-item to="/about">Acerca</b-nav-item>
              </b-navbar-nav>

              <b-navbar-nav class="ml-auto">

                <b-nav-item-dropdown text="Ingresar" right>
                  <b-dropdown-item to="/acceso">Accesar</b-dropdown-item>
                  <b-dropdown-item to="/registro">Registro</b-dropdown-item>
                </b-nav-item-dropdown>
                
                <b-nav-item-dropdown text="User" right>
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
import {auth} from '@/db/firebase';
export default{
  name:'App',
  data(){
    return{

    }
  },
  methods:{
    cierraSesion(){
      auth.signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
    }
  }
}
</scripts>