import { createWebHistory, createRouter } from 'vue-router'

import SideBar from '@/components/SideBar.vue'

import HomePage from '../views/HomePage.vue'
import LogPage from '../views/LogPage.vue'
import AuthPage from '../views/AuthPage.vue'
import DashboardPage from '../views/DashboardPage.vue'
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: "NotFound",
        component: PageNotFound
    },
    {
        path: '/side',
        component: SideBar
    },
    {
        path: '/:id',
        name: 'Home',
        component: HomePage,
        beforeEnter: (from, to, next) => {
            if (from.name == 'Home' && from.path != `/${localStorage.getItem('projectId')}`) {
                next({ name:'NotFound' })
            } else if (to.name == 'Home' && to.path != `/${localStorage.getItem('projectId')}`) {
                next({ name:'NotFound' })
            } else 
                next()
        },
    },
    {
        path: '/dashboard/overview',
        component: LogPage
    },
    {
        path: '/auth',
        name: 'Auth',
        component: AuthPage
    },
    {
        path: '/dashboard/projects',
        name: 'Dashboard',
        component: DashboardPage
    }
]
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

// function to retrieve specific cookie.
function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let split = el.split('=');
        cookie[split[0].trim()] = split.slice(1).join("=");
    })
    return cookie[name];
}

  // guard routes
router.beforeEach(async (to, from, next) => {
    let isAuthenticated = getCookie('pepputoken')
    console.log(isAuthenticated)
    if (to.name !== 'Auth' && !isAuthenticated) next({ name: 'Auth' })
    else next()
})



export default router