// vuex 기본 구성

import { createStore } from "vuex";
import movie from "./movie";
import about from "./about";

export default createStore({
    // movie, about 페이지 필요한 데이터 설정
    modules: {
        movie,
        about
    }
});