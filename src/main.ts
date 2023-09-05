console.log("main.js");
import { createApp } from "vue";
import APP from "./APP.vue";
import routers from "./router";
import pinia from "./store/pinia";

const app = createApp(APP)
app.use(routers).use(pinia)
app.mount("#app")
