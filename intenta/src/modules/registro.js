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
        async crearUsuario({commit}, pl){
            var user ={};
            commit('cargarSpinner', true);
            try {
                if(pl.uid === undefined){
                const createdUser = await auth.createUserWithEmailAndPassword(pl.email, pl.password);
                user = {
                    uid: createdUser.user.uid,
                    name: pl.name,
                    email: createdUser.user.email,
                    imagen: ''
                };
        
                // const token = await createdUser.getIdToken(true);
                // console.log(token.idToken);
                // user.token = idToken;
                }
                else user = pl;

                const userDB = await Vue.axios.post('new-user', user);
                if(userDB.data.result && userDB.data.result === 'Success'){
                    commit('nuevoUsuario', user);

                    setTimeout(()=>{
                        router.push({name:'Main'}).catch((err) => {
                            if(err) console.log(`Hubo un problema al cerrar la sesión: ${err}.`);
                        });
                    }, 2000);

                    return {ok:true, user};
                }
                
                commit('nuevoError', `No se pudo crear el usuario: ${userDB.error}.`);
                return {ok:false};
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