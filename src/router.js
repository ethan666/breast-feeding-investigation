import Vue from "vue";
import Router from "vue-router";
import Main from "@/views/Main";
import MaternalMgr from "@/views/MaternalMgr";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/front/",
      name: "home",
      redirect: "front/index",
      component: Main,
      children: [
        {
          path: "index",
          component: MaternalMgr
        },
        {
          path: "survey/:userId",
          component: () =>
            import(/* webpackChunkName: "edit" */ "./views/Survey.vue"),
          props: true
        }
      ]
    },
    {
      path: "/front/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    {
      path: "/front/404",
      component: () =>
        import(/* webpackChunkName: "fail" */ "@/views/exception/404")
    },
    {
      path: "*",
      redirect: "/404",
      hidden: true
    }
  ]
});
