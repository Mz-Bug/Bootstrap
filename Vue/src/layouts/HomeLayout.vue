<template>
  <q-layout view="lHh Lpr lFf">
    <q-toolbar class="q-px-xl">
      <q-img
        class="q-ml-xl"
        style="width: 200px; height: 70px"
        src="https://nishatemporium.com/wp-content/uploads/2019/06/Logo.svg"
      >
      </q-img>
      <q-space />
      <q-btn
        round
        flat
        dense
        color="purple"
        icon="shopping_cart"
        class="q-mt-sm q-mr-md"
        @click="store.open('top')"
      >
        <q-badge color="red" floating>{{ store.cart.length }}</q-badge>
      </q-btn>
      <q-avatar rounded class="q-ma-sm q-mr-xl">
        <img src="https://cdn.quasar.dev/img/boy-avatar.png" />

        <q-menu class="row no-wrap q-pa-md">
          <div class="column">
            <q-toggle v-model="mobileData" label="Use Mobile Data" />
            <q-toggle v-model="bluetooth" label="Bluetooth" />
          </div>

          <q-separator vertical inset class="q-mx-lg" />

          <div class="column items-center">
            <q-avatar size="72px">
              <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
            </q-avatar>

            <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

            <q-btn
              color="primary"
              label="Logout"
              @click="logout"
              size="sm"
              v-close-popup
            />
          </div>
        </q-menu>
      </q-avatar>
    </q-toolbar>
    <q-dialog v-model="store.dialog" :position="store.position">
      <q-card class="q-pa-md q-gutter-md">
        <div
          class="col-sm-12 col-md-4"
          v-for="(item, index) in store.cart"
          :key="index"
        >
          <q-list class="rounded-borders" bordered>
            <q-item class="q-pa-md" @click="get_product_detalie(item)">
              <q-item-section avatar>
                <q-avatar class="bg-white" size="xl">
                  <img :src="item.images[0]" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-body1 text-bold" lines="1">{{
                  item.title
                }}</q-item-label>
                <q-item-label class="q-pt-xs" lines="1">{{
                  item.description
                }}</q-item-label>
                <q-item-label class="q-pt-xs" lines="1">
                  <div class="text-caption">
                    Stock Available
                    <q-badge outline align="middle" color="teal">
                      {{ item.stock }}
                    </q-badge>
                  </div>
                  <div class="text-right">
                    <q-btn
                      no-caps
                      flat
                      dense
                      color="purple"
                      icon="delete"
                      label="Remove From Cart"
                      @click="store.removeFromCart(item)"
                    />
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card>
    </q-dialog>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useCounterStore } from "../stores/example-store";
export default defineComponent({
  name: "MainLayout",

  setup() {
    const route = useRouter();
    const store = useCounterStore();
    // const dialog = ref(false);
    // const position = ref("top");

    function logout() {
      localStorage.removeItem("token");
      route.push("/");
    }
    return {
      logout,
      store,
      // dialog,
      // position,
      // open(pos) {
      //   position.value = pos;
      //   dialog.value = true;
      // },
    };
  },
});
</script>
