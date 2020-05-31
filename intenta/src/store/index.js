import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db, firebase } from "@/db/firebase";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario:{},
    error:''
  },
  mutations: {
    nuevoUsuario(state, pl){
      state.usuario = pl;
    },
    nuevoError(state, pl){
      state.error = pl;
    }
  },
  actions: {
    crearUsuario({commit}, pl){
      console.log('User: ', pl);
      auth.createUserWithEmailAndPassword(pl.email, pl.password)
      .then(res=>{

        const user ={
          uid: res.user.uid,
          nombre: pl.usuario,
          email: res.user.email,
          imagen: pl.imagen
        };

        auth.currentUser.getIdToken(true).then(function(idToken) {
          console.log(idToken);
        }).catch(function(error) {
          console.log('Error: ', error);
        });
  
        commit('nuevoUsuario', usuario);
      })
      .catch(err=> {
        console.log(err);
        commit('nuevoError', err.message);
      });
      
    },
    firmarUsuario({commit}, user){
      const _user = {
        uid: user.uid,
        nombre: user.displayName,
        email: user.email,
        imagen: user.photoURL
      };

      commit('nuevoUsuario', _user);
    }
  },
  modules: {
  }
})
