<template>
    <b-container>
        <h1 class="text-center mb-3">Registro</h1>
        <div>
          <b-card bg-variant="dark" text-variant="light" class="overflow-hidden card-body bg-light" >
            <b-row no-gutters>
              <b-col md="7" class="ml-2" >
                <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" v-if="show" class="my-3">
                  <b-row>
                      <b-col md="6">
                          <b-form-group
                            id="fieldset-1"
                            label="Ingresa tu email"
                            label-for="input-1"
                            :invalid-feedback="validaEmail"
                            :valid-feedback="emailValido"
                            :state="emailStatus">
                            <b-form-input
                                type="email"
                                v-model.trim="$v.email.$model"
                                :state="emailStatus" 
                                id="input-1"
                                tabindex="1"
                                required/>
                        </b-form-group>

                        <b-form-group
                            id="fieldset-2"
                            description="Debe contener al menos 6 caracteres."
                            label="Crea tu password"
                            label-for="input-2"
                            :invalid-feedback="validaPassword"
                            :valid-feedback="passwordValido"
                            :state="passwordStatus">
                            <b-form-input
                                type="password"
                                v-model.trim="$v.password.$model"
                                id="input-2"
                                tabindex="3"
                                :state="passwordStatus"
                                required
                                />
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                          <b-form-group
                            id="fieldset-3"
                            label="Crea tu usuario"
                            label-for="input-3"
                            :invalid-feedback="validaUsuario"
                            :valid-feedback="usuarioValido"
                            :state="usuarioStatus">
                            <b-form-input
                                v-model.trim="usuario"
                                :state="usuarioStatus" 
                                id="input-3"
                                tabindex="2"
                                :placeholder="sugiereUsuario"
                                required/>
                        </b-form-group>

                        <b-form-group
                            id="fieldset-4"
                            description="Ya sabes que hacer ;)."
                            label="Reingresa tu password"
                            label-for="input-4"
                            :invalid-feedback="validaConfirmacion"
                            :valid-feedback="confirmacionValido"
                            :state="confirmacionStatus">
                            <b-form-input
                                type="password"
                                v-model.trim="$v.confirmacion.$model"
                                id="input-4"
                                tabindex="4"
                                :state="confirmacionStatus"
                                required
                                />
                        </b-form-group>
                      </b-col>
                  </b-row>

                  <b-button type="submit" variant="secondary" class="mr-2" tabindex="5">Entrar</b-button>
                  <b-button type="reset" variant="danger" tabindex="6">Limpiar</b-button>
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
                          @click="google" 
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
    </b-container>
</template>

<script>
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators'
import passwordComplex from '../validaciones/index'
import { mapActions } from "vuex";
import { Registro, Providers } from '../hard-code/index'
import { v4 as uuidv4 } from 'uuid';
import { auth, db, firebase } from "@/db/firebase";

export default {
  name:'Registro',
  data() {
    return {
      usuario: '',
      email: '',
      password: '',
      confirmacion:'',
      show: true,
      textos: Registro(),
      proveedores: Providers()
      }
  },
  validations:{
    email:{
        required,
        email
    },
    password:{
        required,
        minLength: minLength(6),
        passwordComplex
    },
    confirmacion:{
      sameAsPassword: sameAs('password')
    }
  },
  computed:{
    usuarioStatus(){
        return this.usuario.length >= 4;
    },
    passwordStatus(){
        return this.$v.password.passwordComplex && this.$v.password.minLength;
    },
    emailStatus(){
        return this.$v.email.email && !this.$v.email.$error && this.email.length > 0;
    },
    confirmacionStatus(){
      return this.$v.confirmacion.sameAsPassword && this.confirmacion.length > 0;
    },
    validaUsuario(){
      if (!this.usuarioStatus) {
        return this.textos.Valida.Usuario;
      } 
    },
    usuarioValido() {
      return this.usuarioStatus === true ? this.textos.Okay : '';
    },
    passwordValido() {
      return this.passwordStatus === true ? this.textos.Okay : '';
    },
    emailValido() {
      return this.emailStatus === true ? this.textos.Okay : '';
    },
    confirmacionValido(){
      return this.confirmacionStatus === true ? this.textos.Okay : '';
    },
    validaPassword(){
      if (!this.passwordStatus) {
        return this.textos.Valida.Password;
      } 
    },
    validaEmail(){
      if (!this.emailStatus) {
        return this.textos.Valida.Email;
      } 
    },
    validaConfirmacion(){
      if(!this.confirmacionStatus){
        if(this.password.length === 0 && this.confirmacion.length === 0){
          return this.textos.Valida.ConfirmaPass;
        }
        return this.textos.Valida.Confirmacion;
      }
    },
    sugiereUsuario(){
      return this.email.split('@')[0];
    }
  },
  methods: {
    ...mapActions(['crearUsuario']),
    onSubmit() {

      const user ={
        uid: uuidv4(),
        nombre: this.usuario,
        email: this.email,
        password: this.password,
        imagen: ''
      };

      this.crearUsuario(user);
    },
    onReset() {
      this.usuario = this.password = this.email = this.confirmacion = '';
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
          this.show = true
      })
    },
    async registrarConProveedor(proveedor){
      switch(proveedor){
        case this.proveedores[0]: google(); break;
        // case this.proveedores[0]: google(); break;
        // case this.proveedores[0]: google(); break;
      }
    },
    async emailAndPassword(){
      try {

        const result = await auth.createUserWithEmailAndPassword(this.email, this.password);
        const user ={
          uid: uuidv4(),
          nombre: this.usuario,
          email: this.email,
          imagen: ''
        };

        this.dbResult(user);

      } catch (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
      }
    },
    async google(){
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.languageCode = this.textos.Language;

      try{
        
        const result = await auth.signInWithPopup(provider);
        var token = result.credential.accessToken;

        const user = {
          uid: result.user.uid,
          nombre: result.user.displayName,
          email: result.user.email,
          imagen: result.user.photoURL
        };
        
        this.dbResult(user);
      }
      catch(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(error);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
      };
    },
    enviaMensaje(variant = null) {
      this.$bvToast.toast('El registro se completó exitosamente', {
        title: `Variant ${variant || 'default'}`,
        variant: variant,
        solid: true
      })
    },
    dbResult(user){
      db.collection(this.textos.uColeccion).doc(user.email).set(user)
        .then(res=>{

            console.log('Registro creado en DB');
            this.enviaMensaje('success');
            setTimeout(()=>{
              this.$router.push({name:'Inicio'});
            }, 3000);
        })
        .catch(err=>{
          console.log(err);
        });
    }
  }
}
</script>