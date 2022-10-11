<template>
    <div class="about">
        <div class="photo">
            <Loader 
                v-if="imageLoading"
                absolute />
            <img :src="image" alt="">
        </div>
        <p class="name">{{ name }}</p>
        <p>{{ email }}</p>
        <p>{{ site }}</p>
        <p>{{ phone }}</p>
    </div>
</template>

<script>
// computed에서 사용하는 데이터가 아래의 코드처럼 반복될 경우
// 이를 효율적으로 관리하기 위한 vuex의 패키지를 가져온다.
import { mapState } from "vuex";
import Loader from "~/components/Loader";

export default {
    components: {
        Loader
    },
    data() {
        return {
            imageLoading: true
        }
    },
    computed: {
        /*
        image() {
            return this.$store.state.about.image;
        },
        name() {
            return this.$store.state.about.name;
        },
        email() {
            return this.$store.state.about.email;
        },
        site() {
            return this.$store.state.about.site;
        },
        phone() {
            return this.$store.state.about.phone;
        }
        */
        // 위의 코드를 아래로 압축
        // "about"는 모듈명
        // 주의 사항으로 ... 전개연산자를 사용
        ...mapState("about", [
            "image",
            "name",
            "email",
            "site",
            "phone"
        ])
    },
    mounted() {
        this.init()
    },
    methods: {
        async init() {
            await this.$loadImage(this.image);
            this.imageLoading = false;
        }
    }
}
</script>

<style lang="scss" scoped>

.about {
    p {margin: 0;}
    text-align: center;
    .photo {
        width: 250px;
        height: 250px;
        margin: 40px auto 20px;
        padding: 30px;
        border: 10px solid $gray-300;
        border-radius: 50%;
        box-shadow: border-box;
        background-color: $gray-200;
        display: flex;
        align-items: center;
        position: relative;
        img {width: 100%;}
    }
    .name {
        font-size: 40px;
        font-family: "Oswald", sans-serif;
        margin-bottom: 20px;
    }
}
</style>