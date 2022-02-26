import Vue from 'vue'
import VueRouter from 'vue-router'
import CPLogin from '../views/Login.vue'
import NotFound from "../views/NotFound";
import Full from "../containers/Full";
import airports from '../views/airports.vue'
import airlines from '../views/airlines.vue'
import flights from '../views/flights.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'*',
    component:NotFound
  },
  {
    path: '/login',
    name: 'login',
    component: CPLogin
  },
  {
    path: "/panel",
    name: "Full",
    component: Full,
    children: [
      {
          path: 'airports',
          name: 'airports',
          component: airports,
      },
        {
          path: 'airlines',
          name: 'airlines',
          component: airlines,
      },
        {
          path: 'flights',
          name: 'flights',
          component: flights,
      },
    ],
    beforeEnter: (to, form, next) =>{
        console.log(localStorage.getItem('token'));

        next()

    }

  }

]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'font-semibold',
  base: process.env.BASE_URL,
  routes
})

export default router
