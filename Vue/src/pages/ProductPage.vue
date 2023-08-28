<template>
  <div class="q-pa-md flex flex-center">
    <q-card v-if="product" style="width: 400px" bordered>
      <q-card class="my-card" flat bordered>
        <q-card-section>
          <q-img
            :src="product.thumbnail"
            alt="Product Thumbnail"
            style="height: 200px"
          />
        </q-card-section>

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%)"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ product.title }}</div>
            <div
              class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
            >
              <q-icon name="place" />
              250 ft
            </div>
          </div>

          <q-rating v-model="stars" :max="5" size="32px" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">${{ product.price }}</div>
          <div class="text-caption text-grey-7">
            {{ product.description }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right" class="q-my-md">
          <q-btn
            unelevated
            color="purple"
            no-caps
            label="Add to Cart"
            class="text-primary"
            @click="store.addToCart(product)"
          />
          <q-btn
            no-caps
            unelevated
            color="purple"
            label="Buy Now"
            class="text-primary"
          />
        </q-card-actions>
      </q-card>
    </q-card>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { api } from "src/boot/axios";
import { useRoute } from "vue-router";
import { useCounterStore } from "../stores/example-store";
export default {
  name: "productPage",
  setup() {
    const route = useRoute();
    const product = ref([]);
    const productId = route.params.id;
    const store = useCounterStore();
    onMounted(() => {
      api(`https://dummyjson.com/products/${productId}`)
        .then((response) => {
          console.log("Response data:", response.data);
          product.value = response.data;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
    return {
      product,
      stars: ref(3.5),
      store,
    };
  },
};
</script>

<style>
/* Add your custom styles here */
</style>
