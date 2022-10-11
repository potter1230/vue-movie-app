<template>
    <Headline />
    <Search />
    <MovieList />
</template>

<script>
import Headline from "~/components/Headline";
import Search from "~/components/Search";
import MovieList from "~/components/MovieList";

export default {
    components: {
        Headline,
        Search,
        MovieList
    },
    created() {
        // store에서 mutation 속성에 만들어진 메소드를 사용하려면
        // commit 메소드를 사용
        // 초기화를 위한 메소드
        this.$store.commit("movie/resetMovies");
    }
}
</script>