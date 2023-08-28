const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/",
    meta: { requiresAuth: true },
    component: () => import("layouts/HomeLayout.vue"),
    children: [
      { path: "/home", component: () => import("pages/HomePage.vue") },
      {
        path: "/product/:id",
        name: "productPage",
        component: () => import("pages/ProductPage.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
