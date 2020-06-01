import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from "../db/firebase";

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Inicio',
        component: () =>
            import ('../views/Inicio.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('../views/About.vue')
    },
    {
        path: '/registro',
        name: 'Registro',
        component: () =>
            import ('../views/Registro.vue')
    },
    {
        path: '/acceso',
        name: 'Acceso',
        component: () =>
            import ('../views/Acceso.vue')
    },
    {
        path: '/main',
        name: 'Main',
        component: () =>
            import ('../views/Main.vue'),
        meta:{ requiresAuth:true }
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to,from,next)=>{
    const rutaProtegida = to.matched.some(record=> record.meta.requiresAuth);
    const user = auth.currentUser;

    if(rutaProtegida && user === null){
        next({name:'Inicio'});
    }
    else{
        next();
    }

});

export default router