import { createRouter, createWebHashHistory } from "vue-router";

const routers = createRouter({
    routes: [{
        name: 'home',
        path: '/home',
        component: () => import("../pages/home/home.vue")
    },{
        name: 'about',
        path: '/about',
        component: () => import("../pages/about/index.vue")
    }],
    history: createWebHashHistory()
})

export default routers