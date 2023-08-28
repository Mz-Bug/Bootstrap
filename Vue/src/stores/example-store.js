import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { Notify } from "quasar";
export const useCounterStore = defineStore("counter", {
  state: () => ({
    // counter: 0,
    productsList: [],
    buttons: [],
    buttonsData: false,
    colorPalette: ["#BAE5F5", "#E2D3FE", "#BADBAF"],
    cart: [],
    dialog: false,
    position: "top",
  }),
  getters: {
    getButtons() {
      return this.buttons;
    },
    getProducts() {
      return this.productsList;
    },
    getButtonsData() {
      return this.buttonsData;
    },
  },
  actions: {
    async User_Login(user) {
      try {
        const response = await api.post("/auth/login", user);
        const token = response.data.token;

        localStorage.setItem("token", token);
        this.router.push("/home");

        Notify.create({
          message: "You have successfully logged in",
          color: "positive",
          icon: "eva-checkmark-circle-outline",
          position: "top",
          timeout: 1000,
        });
      } catch (error) {
        console.log(error);

        Notify.create({
          message: "Invalid Credentials",
          color: "negative",
          icon: "eva-close-circle-outline",
          position: "top",
          timeout: 1000,
        });
      }
    },
    async GET_PRODUCTS() {
      try {
        const response = await api.get("/products");
        const processedProducts = response.data.products.map(
          (product, index) => {
            product.backgroundColor =
              this.colorPalette[index % this.colorPalette.length];
            return product;
          }
        );
        this.productsList = processedProducts;
      } catch (error) {
        console.error("Error fetching and processing products:", error);
      }
    },
    async Get_Cetegories() {
      try {
        const response = await api.get(
          "https://dummyjson.com/products/categories"
        );

        const allProductsButton = { label: "All Products", isActive: true };
        const categoryButtons = response.data.map((category) => ({
          label: category,
          isActive: false,
        }));

        this.buttons = [allProductsButton, ...categoryButtons];
      } catch (error) {
        console.error("Error:", error);
      }
    },
    addToCart(product) {
      console.log("product", product);
      this.cart.push(product);
      this.router.push("/home");
    },
    removeFromCart(product) {
      const index = this.cart.indexOf(product);
      this.cart.splice(index, 1);
      if (this.cart.length === 0) {
        this.dialog = false;
      }
    },
    open(pos) {
      this.position = pos;
      this.dialog = true;
    },
  },
});
