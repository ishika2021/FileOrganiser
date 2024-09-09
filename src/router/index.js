import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: import("@/layout/baseLayout.vue"),
    children: [
      {
        path: "/",
        name: "Folders",
        component: () => import("@/views/Folders"),
      },
      {
        path: "/Dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard"),
      },
      {
        path: "/recent",
        name: "Recent",
        component: () => import("@/views/Recent"),
      },
      {
        path: "/starred",
        name: "Starred",
        component: () => import("@/views/Starred"),
      },
      {
        path: "/trash",
        name: "Trash",
        component: () => import("@/views/Trash"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
