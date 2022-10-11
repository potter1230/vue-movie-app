import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./Home";
import Movie from "./Movie";
import About from "./About";
import NotFound from "./NotFound";

export default createRouter({
    // 우선 hash 모드 사용
    // hash 모드란 https://example.com/#/about 이렇게 페이지 이동
    history: createWebHashHistory(),
    // 페이지 이동시 스크롤이 최상단에서
    scrollBehavior() {
        return { top: 0 }
    },
    // 페이지들
    // path: "/" 이 뜻은 https://example.com/ 이 문자열에 마지막 / 이게 왔을떄 어떤 컴포넌트가 작동하게 할지 설정
    routes: [
        {
            path: "/",
            component: Home
        },
        {
            // movie/다양한 아이디들
            // 다양한 아이디들을 동적으로 관리하기 위해 변수를 추가
            // 이 id 변수에 접근하는 방법은 
            // id 변수의 값을 사용할 컴포넌트로 가서
            // this.$route.params.변수명
            path: "/movie/:id",
            component: Movie
        },
        {
            path: "/about",
            component: About
        }, 
        {
            // notFound의 이름은 맘대로 abc도 됨 
            // () 안에 정규표현식 잇음
            // .은 다음 나올 단어와 일치 확인
            // *은 최대한 많이
            path: "/:notFound(.*)", 
            component: NotFound
        }
    ]
});