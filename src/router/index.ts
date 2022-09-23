import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/jobs",
    name: "jobs",
    component: () => import("../components/JobsList.vue"),
  },
  {
    path: "/jobs/:id",
    name: "job-details",
    component: () => import("../components/JobDetails.vue"),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("../components/AddJob.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
