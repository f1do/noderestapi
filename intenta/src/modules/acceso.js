import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from "@/db/firebase";
import router from '../router'

export default {
    namespaced: true,
    state:{
        usuario:{},
        error: undefined,
        carga: false
    },
    mutations:{
        nuevoUsuario(state, pl){
        state.usuario = pl;
        state.error = undefined;
        },
        nuevoError(state, pl){
        state.error = pl;
        },
        cargarSpinner(state, pl){
        state.carga = pl;
        }
    },
    actions:{
        async userLogin({commit}, pl){
            var user ={};
            commit('cargarSpinner', true);
            try {
                const result = await auth.signInWithEmailAndPassword(pl.email, pl.password);
                router.push({name:'Main'}).catch((err) => {
                    if(err) console.log(`Hubo un problema al cerrar la sesión: ${err}.`);
                });
            } catch (err) {
                console.log(err);
                commit('nuevoError', err.message); 
                return {ok:false};
            }
            finally{ commit('cargarSpinner', false); }
        }
    },
    getters:{
        
    }
}