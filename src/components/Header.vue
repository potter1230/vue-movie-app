<template>
    <header>
        <Logo />
        <ul class="nav nav-pills">
            <li 
                class="nav-item"
                v-for="nav in navigations" :key="nav">
                <RouterLink 
                    :to="nav.href"
                    class="nav-link"
                    active-class="active"
                    :class="{ active: isMatch(nav.path) }">
                    {{ nav.name }}
                </RouterLink>
            </li>
        </ul>
        <div 
            class="user"
            @click="toAbout">
            <img 
                :src="mImage" 
                :alt="name" />
        </div>
    </header>
</template>

<script>
import { mapState } from "vuex";
// import Logo from "./Logo";
import Logo from "~/components/Logo";

export default {
    components: {
        Logo
    },
    data() {
        return {
            navigations: [
                {
                    name: "Search",
                    href: "/"
                },
                {
                    name: "Movie",
                    href: "/movie",
                    // 검색된 영화의 링크를 타고 들어가면 
                    // nav에 movie의 active 클래스가 활성화 안됐음
                    // 그걸 위해 path라는 속성을 사용
                    // 정규 표현식 /movie로 시작하는 단어 찾아
                    // 이걸 어떻게 쓰냐면
                    // html에 isMatch(nav.path)라고함
                    // 근데 isMatch() 메소드는 아래에서 만듬
                    path: /^\/movie/
                },
                {
                    name: "About",
                    href: "/about"
                }
            ]
        }
    },
    computed: {
        /*
        image() {
            return this.$store.state.about.image;
        },
        mImage() {
            return this.$store.state.about.mImage;
        },
        name() {
            return this.$store.state.about.name;
        }
        */
        ...mapState("about", [
            "image",
            "mImage",
            "name"
        ])
    },
    methods: {
        isMatch(path) {
            if( !path ) return false;
            console.log( this.$route );
            return path.test( this.$route.fullPath );
        },
        toAbout() {
            // RouterLink 태그 사용 말고
            // 이렇게 링크 이동할 수 있음
            this.$router.push("/about");
        }
    }
}
</script>

<style lang="scss" scoped>

header {
    height: 70px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    position: relative;
    .logo {
        margin-right: 40px;
    }
    .user {
        width: 40px;
        heighT: 40px;
        padding: 6px;
        border-radius: 50%;
        box-sizing: border-box;
        background-color: $gray-200;
        cursor: pointer;
        position: absolute;
        right: 40px;
        top: 0;
        bottom: 0;
        margin: auto;
        transition: 0.4s;
        &:hover {
            background-color: darken($gray-200, 10%);
        }
        img {width: 100%;}
    }
    // 반응형
    @include media-breakpoint-down(sm) {
        .nav {display: none;}
    }
}
</style>