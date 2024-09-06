import { createRouter, createWebHistory } from "vue-router";
import baseLayout from "@/layout/baseLayout.vue";
import Dashboard from "@/views/Dashboard";
import Folders from "@/views/Folders";
import Recent from "@/views/Recent";
import Starred from "@/views/Starred";
import Trash from "@/views/Trash";

const routes = [
  {
    path: "/",
    component: baseLayout,
    children: [
      {
        path: "/",
        name: "Folders",
        component: Folders,
      },
      {
        path: "/Dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/recent",
        name: "Recent",
        component: Recent,
      },
      {
        path: "/starred",
        name: "Starred",
        component: Starred,
      },
      {
        path: "/trash",
        name: "Trash",
        component: Trash,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
