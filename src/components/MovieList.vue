<template>
    <div class="container">
        <div 
            :class="{ 'no-result': !movies.length }" 
            class="inner">
            <!-- <p 
                v-if="loading"
                class="spinner-border text-primary"></p> -->
            <Loader v-if="loading" />
            <p 
                v-if="message"
                class="message">
                {{ message }}
            </p>
            <div 
                v-else
                class="movies">
                <MovieItem 
                    v-for="movie in movies"
                    :key="movie.imdbID"
                    :movie="movie" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import MovieItem from "~/components/MovieItem";
import Loader from "~/components/Loader";

export default {
    components: {
        MovieItem,
        Loader
    },
    computed: {
        /*
        movies() {
            return this.$store.state.movie.movies;
            // this.$store.옵션명.모듈명.옵션의 데이터명
        },
        message() {
            return this.$store.state.movie.message;
        },
        loading() {
            return this.$store.state.movie.loading;
        }
        */
        ...mapState("movie", [
            "movies",
            "message",
            "loading"
        ])
    }
}
</script>

<style lang="scss" scoped>

.container {
    p {margin: 0;}
    margin-top: 30px;
    .inner {
        background-color: $gray-200;
        padding: 10px 0;
        border-radius: 4px;
        text-align: center;
        &.no-result {padding: 70px 0;}
    }
    .message {
        color: $gray-400;
        font-size: 20px;
    }
    .movies {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
}
</style>