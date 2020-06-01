import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from "@/db/firebase";
import registro from "../modules/registro";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: {},
    error: undefined,
    token: ''
  },
  mutations: {
    nuevoUsuario(state, pl){
      state.usuario = pl;
      state.error = undefined;
    },
    nuevoError(state, pl){
      state.error = pl;
    },
    establecerToken(state, pl){
      state.token = pl;
    }
  },
  actions: {
    async firmarUsuario({commit, state}, user){

      if(!user.name){
        await this.dispatch('leerToken');

        let config = {
          headers: {
            token: state.token
          }
        }

        const usr = await Vue.axios.get(`user/${user.uid}`, config);
        if(usr != null && usr.data && usr.data.result === 'Success'){
          user = usr.data.message[user.uid];
        }
      }

      commit('nuevoUsuario', user);
    },
    async leerToken({commit}){
      try {
        let idToken = await auth.currentUser.getIdToken(true);
        commit('establecerToken', idToken);
      } catch (err) {
        commit('nuevoError', err);
      }
    }
  },
  modules: {
    registro
  }
})
