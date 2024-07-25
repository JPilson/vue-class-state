import {createApp} from 'vue'
import './style.css'
import Setup from "./devtools/Setup.ts";
import App from "./App.vue";


const appInstance = createApp(App);
appInstance.use(Setup.install)

appInstance.mount("#app")
