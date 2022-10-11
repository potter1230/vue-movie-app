<template>
    <RouterLink
        :to="`/movie/${movie.imdbID}`" 
        class="movie"
        :style="{backgroundImage: `url(${movie.Poster})`}">
        <Loader
            v-if="imageLoading"
            :size="1.5"
            absolute />
        <div class="info">
            <p class="year">{{ movie.Year }}</p>
            <p class="title">{{ movie.Title }}</p>
        </div>
    </RouterLink>
</template>

<script>
import Loader from "~/components/Loader";

export default {
    components: {
        Loader
    },
    props: {
        movie: {
            type: Object,
            default: () => ({}) // function() { return {} }
            // MovieList.vue의 :movie="movie" 의 데이터를 받기위한 코드
            // props로 데이터를 전달해줄때 객체나 배열 데이터의 기본값을 설정할때 배열로 만들어서 return해주는 방식으로 해야함
            
        }
    },
    // 검색된 영화의 각 이미지가 로드 될때 로딩 중을 의미하는 애니메이션 만들기
    // 29. vue 플러그인 참조
    data() {
        return {
            // 이미지가 로딩중입니다의 상태를 true로 시작
            // 로딩이 끝나면 false로 바꿔줌
            imageLoading: true,
        }
    },
    mounted() {
        // mounted는 컴포넌트가 html에 연결된 직후에 동작함
        // created는 컴포넌트가 생성된 직후에 동작해서 html에 연결되기 전에다
        // html에 연결되면 init()메소드 실행
        this.init()
    },
    methods: {
        // 초기화
        async init() {
            /*
            const imgEl = document.createElement("img");
            imgEl.src = this.movie.Poster;
            // 이미지가 로드가 되면 imageLoading 값을 false
            // 화살표 함수로 콜백함수를 만들면 전체의 데이터를 this로 참조가능
            // but function 키워드로 함수를 만들면 그 함수가 만들어진 영역내에 있는 값만 this로 참조해서 다른 곳의 데이터를 받아오지 못함
            // 그래서 vue에선 대부분 콜백을 화살표로 만들어 쓴다.
            imgEl.addEventListener("load", () => {
                this.imageLoading = false;
            });
            
            여기 내용이 전부 플러그인으로 옮겨감
            */
            const poster = this.movie.Poster;
            if( !poster || poster === "N/A" ) {
                this.imageLoading = false;
            } else {
                await this.$loadImage(poster);
                this.imageLoading = false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.movie {
    $width: 200px;
    width: $width;
    height: calc($width * 3 / 2);
    margin: 10px;
    border-radius: 4px;
    background-color: $gray-400;
    background-size: cover;
    overflow: hidden;
    position: relative;
    &:hover::after {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        border: 6px solid $primary;
    }
    .info {
        position: absolute;
        left: 0;
        bottom: 0;
        background: rgba($black, 0.3);
        width: 100%;
        padding: 14px;
        font-size: 14px;
        text-align: center;
        backdrop-filter: blur(10px);
        p {margin: 0;}
        .year {color: $primary}
        .title {
            color: #fff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>