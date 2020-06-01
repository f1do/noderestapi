<template>
    <b-container>
        <h1 class="text-center mb-3">Bienvenido</h1>

        <div>
          <b-card class="overflow-hidden card-body bg-light" >
            <b-row no-gutters>
              <b-col></b-col>
              <b-col md="6" >
                <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" v-if="show" class="my-3">
                  <b-form-group
                    id="fieldset-1"
                    :description="mensajeInputUsuario"
                    label="Ingresa tu usuario"
                    label-for="input-1"
                    :invalid-feedback="validaUsuario"
                    :valid-feedback="usuarioValido"
                    :state="userStatus">
                      <b-form-input
                          v-model.trim="usuario"
                          :state="userStatus" 
                          id="input-1"
                          :placeholder="mensajeInputUsuario"
                          required/>
                  </b-form-group>

                  <b-form-group
                    id="fieldset-1"
                    description="Ya sabes que hacer ;)."
                    label="Ingresa tu password"
                    label-for="input-2"
                    :invalid-feedback="validaPassword">
                      <b-form-input
                          type="password"
                          v-model.trim="password"
                          id="input-2"
                          required
                          />
                  </b-form-group>

                  <b-button type="submit" variant="secondary" class="mr-2" right>Entrar</b-button>
                  <b-button type="reset" variant="danger" right>Limpiar</b-button>
                </b-form>
              </b-col>
              <b-col class="border-right"></b-col>
              <b-col md="4">
                <b-card-body class="text-center" title="Utiliza otro método">
                  <b-card-text>
                    <b-row>
                      <b-col>
                        <b-button class="btn-block" variant="danger">GMAIL</b-button>
                        <b-button class="btn-block" variant="primary">FACEBOOK</b-button>
                        <b-button class="btn-block" variant="dark">APPLE</b-button>
                        <b-button class="btn-block" variant="info" >TWITTER</b-button>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card-body>
              </b-col>
              <!-- <b-col></b-col> -->
            </b-row>
          </b-card>
        </div>
    </b-container>
</template>

<script>
import { auth, firebase } from "@/db/firebase";

export default {
  name:'Acceso',
  data() {
    return {
      mensajeInputUsuario: 'Puedes ingresar tu nick o tu correo.',
      usuario: '',
      password: '',
      show: true
    }
  },
  computed:{
    userStatus(){
      return this.usuario.length >= 4;
    },
    validaUsuario(){
      if (this.usuario.length > 4) {
          return ''
        } else if (this.usuario.length === 0) {
          return 'Ingresa un usuario/email'
        } 
    },
    usuarioValido() {
        return this.userStatus === true ? 'Parece estar bien.' : ''
    },
    validaPassword(){
      if (this.password.length > 4) {
          return ''
        } else if (this.password.length === 0) {
          return 'Ingresa tu contraseña'
        } 
    }
  },
  methods: {
    async onSubmit() {
      try {
        const result = await auth.signInWithEmailAndPassword(this.usuario, this.password);
        this.$router.push({name:'Main'}).catch((err) => {
          if(err) console.log(`Problem handling something: ${err}.`);
        });

      } catch (err) {
        console.log('Error: ', err);
      }
    },
    onReset() {
      this.usuario = '';
      this.age = '';
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>