<template>
    <div class="container">
        <input 
            class="form-control"
            type="text"
            v-model="title"
            @keyup.enter="apply"
            placeholder="Search for Movies, Series & more">
        <div class="selects">
            <select 
                v-for="filter in filters" 
                :key="filter.name"
                v-model="$data[filter.name]" 
                class="form-select">
                <option 
                    value=""
                    v-if="filter.name === 'year'">
                    All Years
                </option>
                <option
                    v-for="item in filter.items"
                    :key="item">
                    {{ item }}
                </option>
            </select>
        </div>
        <button 
            class="btn btn-primary"
            @click="apply">
            Apply
        </button>
    </div>
</template>

<script>
// import axios from "axios";

export default {
    data() {
        return {
            title: "",
            type: "movie",
            number: 10,
            year: "",
            filters: [
                {
                    name: 'type',
                    items: ["movie", "series", "episode"]
                },
                {
                    name: "number",
                    items: [10, 20, 30]
                },
                {
                    name: "year",
                    // ( function() {} )() 즉시 실행 함수
                    // ( () => {} )() => 즉시 실행 함수, 화살표 함수형
                    items: ( () => {
                        const years = [];
                        const thisYear = new Date().getFullYear();
                        for ( let i = thisYear; i >= 1985; i-- ){
                            years.push(i);
                        }
                        return years;
                    } )()
                }
            ]
        }
    },
    methods: {
        // async apply() {
        //     // 검색 
        //     const OMDB_API_KEY = "7035c60c";
        //     const result = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${this.title}&type=${this.type}&y=${this.year}&page=1`);
        //     console.log(result);
        // } 
        // store -> movie.js 로 이동
        async apply() {
            this.$store.dispatch("movie/searchMovies", {
                title: this.title,
                type: this.type,
                number: this.number,
                year: this.year
            });
        }
    },
    mounted() {
        console.log(this.filters[0].items);
        console.log(this.type);
    }
}
</script>

<style lang="scss" scoped>

.container{
    display: flex;
    font-size: 16px;
    .selects {
        display: flex;
        select {
            width: 120px;
            margin-left:10px;
        }
    }
    .btn {
        width: 120px;
        height: 50px;
        font-weight: 700;
        flex-shrink: 0; 
        // 부모에게 flex 속성을 부여하면 자식들이 알아서 값이 맞춰지는데 flex-shrink: 1; 이라는 기본값 때문 근데 어떤 요소가 자동으로 값이 조정되지 않게 하려면 0으로 바꿔줌
        margin-left: 10px;
    }
    // 반응형

    @include media-breakpoint-down(lg) { // lg = large
        display: block;
        input {
            margin-right: 0;
            margin-bottom: 10px;
        }
        .selects {
            margin-left: 0;
            margin-bottom: 10px;
            select {
                width: 100%;
                &:first-child {margin-left: 0;}
            }
        }
        .btn {
            width: 100%;
            margin-left: 0;
        }
    }
}
</style>

v-model="$data[filter.name]" <!-- 데이터를 동적으로 사용할때 [] 대괄호씀 -->
$data.type // movie
$data["type"] // movie


<p style="display: none;">{{ $data.filters[0].name }}</p>
    <p style="display: none;">{{ $data["type"] }}</p>
    <p style="display: none;"
        v-for="filter in filters" 
        :key="filter.name">
        {{ $data[filter.name] }} 
    </p>