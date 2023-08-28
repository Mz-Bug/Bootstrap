<template>
  <div class="q-mx-xl">
    <div class="q-px-lg">
      <div class="text-center text-bold text-h5 q-mt-xl">
        Jhon Deo, So, what do you have in mind today?
      </div>
      <div class="text-center q-mt-md text-body1">
        Jhon Deo, So, what do you have in mind today?
      </div>

      <div class="text-center">
        <div style="display: inline-block">
          <q-scroll-area style="height: 90px; width: 940px; overflow: hidden">
            <div
              class="row q-gutter-md no-wrap"
              style="
                white-space: nowrap;
                overflow-x: auto;
                justify-content: center;
              "
            >
              <q-btn
                v-for="(btn, index) in store.buttons"
                :key="index"
                no-caps
                class="q-mt-xl q-px-lg"
                :class="['custom-button', { 'active-button': btn.isActive }]"
                :label="btn.label"
                size="md"
                rounded
                :outline="!btn.isActive"
                :flat="btn.isActive"
                :color="btn.isActive ? 'white' : 'blue-grey-8'"
                @click="activateButton(btn.label, index)"
              />
            </div>
          </q-scroll-area>
        </div>
      </div>
      <div class="text-h6 q-ma-md text-bold">Popular categories</div>
      <div class="q-my-lg">
        <div class="row q-col-gutter-lg">
          <div
            class="col-sm-12 col-md-4"
            v-for="(item, index) in store.productsList.slice(0, 3)"
            :key="index"
            style="width: 400px"
          >
            <q-list
              class="rounded-borders"
              bordered
              :style="{ backgroundColor: item.backgroundColor }"
            >
              <q-item class="q-my-sm">
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
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
      <div class="text-h6 q-ma-md text-bold">All Products</div>
      <div class="row q-col-gutter-lg">
        <div
          class="col-sm-12 col-md-4"
          v-for="(item, index) in store.productsList"
          :key="index"
          style="width: 400px"
        >
          <q-list class="rounded-borders" bordered>
            <q-item
              clickable
              class="q-pa-md"
              @click="get_product_detalie(item)"
            >
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
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { api } from "src/boot/axios";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCounterStore } from "../stores/example-store";
export default {
  setup() {
    const store = useCounterStore();
    const route = useRouter();
    function get_product_detalie(item) {
      console.log("item", item.id);
      route.push({
        name: "productPage",
        path: "/product",
        params: { id: item.id },
      });
    }
    // const activateButton = async (label, index) => {
    //   store.buttons.forEach((btn, i) => {
    //     btn.isActive = i === index;
    //   });
    //   try {
    //     if (label === "All Products") {
    //       const response = await api.get("https://dummyjson.com/products");
    //       store.productsList = response.data.products;
    //     } else {
    //       const response = await api.get(
    //         `https://dummyjson.com/products/category/${label}`
    //       );
    //       store.productsList = response.data.products;
    //     }
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
    // };
    const activateButton = async (label, index) => {
      store.buttons.forEach((btn, i) => {
        btn.isActive = i === index;
      });

      try {
        let response;
        if (label === "All Products") {
          response = await api.get("https://dummyjson.com/products");
        } else {
          response = await api.get(
            `https://dummyjson.com/products/category/${label}`
          );
        }

        const processedProducts = response.data.products.map(
          (product, index) => {
            product.backgroundColor =
              store.colorPalette[index % store.colorPalette.length];
            return product;
          }
        );

        store.productsList = processedProducts;
      } catch (error) {
        console.error("Error:", error);
      }
    };
    onMounted(() => {
      store.GET_PRODUCTS();
      store.Get_Cetegories();
    });

    return {
      activateButton,
      get_product_detalie,
      store,
    };
  },
};
</script>
<style>
.custom-button {
  background-color: transparent;
}

.custom-button.active-button {
  background-color: purple;
}
</style>
