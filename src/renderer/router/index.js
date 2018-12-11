import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "main",
      component: require("@/components/pages/Main").default
    },
    {
      path: "/recommendation",
      name: "recommendation",
      component: require("@/components/pages/Recommendation").default
    },
    {
      path: "/animes",
      name: "animes",
      component: require("@/components/pages/Animes").default
    },
    {
      path: "/feedback",
      name: "feedback",
      component: require("@/components/pages/Feedback").default
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});