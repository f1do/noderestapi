<template>
    <b-container>
        <h1 class="text-center mb-3">Bienvenido</h1>

        <div v-if="!carga">
          <b-card class="overflow-hidden card-body bg-light" >
            <b-row no-gutters>
              <b-col></b-col>
              <b-col md="6" >
                <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" v-if="show" class="my-3">
                  <b-form-group
                    id="fieldset-1"
                    :description="textos.InputEmail"
                    :label="textos.InputEmail"
                    label-for="input-1"
                    :invalid-feedback="validaEmail"
                    :valid-feedback="emailValido"
                    :state="emailStatus">
                      <b-form-input
                          v-model.trim="$v.email.$model"
                          :state="emailStatus" 
                          id="input-1"
                          :placeholder="textos.InputEmail"
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
                        <b-button class="btn-block" 
                          v-for="(p, index) in proveedores"
                          :key="p"
                          @click="registrarConProveedor(p.split('|')[0])" 
                          :variant="p.split('|')[1]" 
                          :tabindex="7 + index">{{p.split('|')[0]}}</b-button>
                      </b-col>
                    </b-row>
                  </b-card-text>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card>
        </div>
        <div v-if="carga" class="mx-auto" style="width:400px">
          <h3>Comunicando con el servidor</h3>
          <hr/>
          <sync-loader :loading="carga" ></sync-loader>
        </div>
    </b-container>
</template>

<script>
import { auth, firebase } from "@/db/firebase";
import { mapActions, mapState } from "vuex";
import { required, email } from 'vuelidate/lib/validators'
import { Acceso, Providers } from '../hard-code/index'
import SyncLoader from 'vue-spinner/src/SyncLoader'

export default {
  name:'Acceso',
  data() {
    return {
      email: '',
      password: '',
      show: true,
      textos: Acceso,
      proveedores: Providers
    }
  },
  validations:{
    email:{ required, email }
  },
  computed:{
    ...mapState('acceso', ['carga']),
    userStatus(){
      return this.email.length >= 4;
    },
    validaEmail(){
      if (!this.emailStatus) {
        return this.textos.Valida.Email;
      } 
    },
    emailValido() {
      return this.emailStatus === true ? this.textos.Okay : '';
    },
    emailStatus(){
        return this.$v.email.email && !this.$v.email.$error && this.email.length > 0;
    },
    validaPassword(){
      if (this.password.length > 5) {
          return ''
        } else if (this.password.length === 0) {
          return this.textos.Valida.password;
        } 
    }
  },
  methods: {
    ...mapActions('acceso', ['userLogin']),
    async onSubmit() {
      try {
        await this.userLogin({email:this.email, password: this.password});
      } catch (err) {
        console.log('Error: ', err);
      }
    },
    onReset() {
      this.email = '';
      this.age = '';
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    async registrarConProveedor(proveedor){
      switch(proveedor){
        case this.proveedores[0].split('|')[0]: this.google(); break;
        // case this.proveedores[0]: google(); break;
        // case this.proveedores[0]: google(); break;
      }
    },
    async google(){
      console.log('Inicio con google.');
    }
  },
  components:{
    SyncLoader
  }
}
</script>