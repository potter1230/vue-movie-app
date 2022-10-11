import { createApp } from "vue";
import App from "./App";
// import router from "./routes/index";
import router from "./routes";
// vuex 연결
// import store from "./store/index";
// 특성 폴더에서 가져올 파일의 이름이 index일 경우 생략가능
import store from "./store"; 
// 플러그인 연결
import loadImage from "./plugins/loadImage";

// createApp(App).mount("#app");
createApp(App)
    .use(router)
    .use(store)
    .use(loadImage)
    .mount("#app");