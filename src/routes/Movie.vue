<template>
    <div class="container">
        <template v-if="loading">
            <div class="skeletons">
                <p class="skeleton poster"></p>
                <div class="specs">
                    <p class="skeleton tit"></p>
                    <p class="skeleton spec"></p>
                    <p class="skeleton plot"></p>
                    <p class="skeleton etc"></p>
                    <p class="skeleton etc"></p>
                    <p class="skeleton etc"></p>
                </div>
            </div>
            <!-- 
                :z-index 처럼 props를 html에서 작성할때는 camelCase가 아니라 dash-case 사용

                :fixed="true"
                이렇게 Boolean 데이터를 추가할때는 속성명을 명시하는 것만으로 true값을 전할 수 있음
            -->
            <Loader
                :size="3"
                :z-index="9"
                fixed />
        </template>
        
        <div
            v-else 
            class="movie-details">
            <div 
                class="poster"
                :style="{ backgroundImage: `url(${ requestDiffSizeImage(theMovie.Poster) })` }">
                <Loader
                    v-if="imageLoading"
                    absolute />
            </div>
            <div class="specs">
                <p class="tit">
                    {{ theMovie.Title }}
                </p>
                <div class="labels">
                    <p>{{ theMovie.Released }}</p>
                    <p>{{ theMovie.Runtime }}</p>
                    <p>{{ theMovie.Country }}</p>
                </div>
                <p class="plot">
                    {{ theMovie.Plot }}
                </p>
                <div class="ratings">
                    <h3>Ratings</h3>
                    <div class="rating-wrap">
                        <p 
                            v-for="{ Source: name, Value: score } in theMovie.Ratings"
                            :key="name"
                            :title="name"
                            class="rating">
                            <img 
                                :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`" 
                                :alt="name">
                            <span>{{ score }}</span>
                        </p>
                    </div>
                </div>
                <div>
                    <h3>Actors</h3>
                    {{ theMovie.Actors }}
                </div>
                <div>
                    <h3>Director</h3>
                    {{ theMovie.Director }}
                </div>
                <div>
                    <h3>Production</h3>
                    {{ theMovie.Production }}
                </div>
                <div>
                    <h3>Genre</h3>
                    {{ theMovie.Genre }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
    // 영화의 상세정보 출력
    // computed는 계산된 데이터
    computed: {
        /*
        theMovie() {
            return this.$store.state.movie.theMovie;
            // this.$store.옵션명.모듈명.옵션의 데이터명
        },
        loading() {
            return this.$store.state.movie.loading;    
        }
        */
        ...mapState("movie", [
            "theMovie",
            "loading"
        ])
    },
    // 해당 컴포넌트 실행 직후
    created() {
        // console.log(this.$route);
        this.$store.dispatch("movie/searchMovieWithId", {
            id: this.$route.params.id
        });
    },
    methods: {
        requestDiffSizeImage(url, size = 700) {
            if( !url || url === "N/A" ) {
                this.imageLoading = false;
                return "";
            } 
            const src = url.replace("SX300", `SX${size}`);
            // 이 플러그인이 비동기로 실행이 된 다음에 이미지 로딩이 종료가 되야 하는데 requestDiffSizeImage() 메소드는 단순하게 이미지의 이름을 바꿔서 반환하는 역할만 해주고 그 데이터를 내보내야 포스터를 출력할수 있는데 평소처럼 await this.$loadImage(src); 키워드를 입력하면 로딩이 끝나고 나서야 src가 반환되는 문제가 생기기 때문에
            // 이를 처리하기 위해 async, await가 아닌 then() 메소드 사용
            // 이렇게 되면 this.$loadImage(src).then(); 처리와 return src;가 별개가 되기 때문에 this.$loadImage(src)가 처리되길 기다리지 않는다.
            // 이렇게 async, await를 사용하지 못하는 경우도 있는데 이때 then() 메소드를 사용해 로직의 흐름에 방해를 하지 않고도 비동기를 처리할 수 있다.
            this.$loadImage(src).then(() => {
                this.imageLoading = false;
            });
            return src;
        }
    }
}
</script>

<style lang="scss" scoped>

$width: 500px;

.container {
    padding-top: 40px;
    p {margin: 0;}
}
.skeletons {
    display: flex;
    .poster {
        width: $width;
        height: calc( $width * 3 / 2 );
        margin-right: 70px;
    }
    .specs {
        flex-grow: 1;
    }
    .skeleton {
        border-radius: 10px;
        background-color: $gray-200;
        &.tit {
            width: 80%;
            height: 70px;
        }
        &.spec {
            width: 60%;
            height: 30px;
            margin-top: 20px;
        }
        &.plot {
            width: 100%;
            height: 250px;
            margin-top: 20px;
        }
        &.etc {
            width: 50%;
            height: 50px;
            margin-top: 20px;
        }
    }
}
.movie-details {
    display: flex;
    color: $gray-600;
    .poster {
        flex-shrink: 0;
        width: $width;
        height: calc( $width * 3 / 2 );
        margin-right: 70px;
        border-radius: 10px;
        background-color: $gray-200;
        background-size: cover;
        background-position: center;
        position: relative;
    }
    .specs {
        flex-grow: 1;
        .tit {
            color: $black;
            font-family: 'Oswald', sans-serif;
            font-size: 70px;
            line-height: 1.2;
            margin-bottom: 30px;
        }
        .labels {
            color: $primary;
            p {
                display: inline;
                &::after {
                    content: "·";
                    margin: 0 6px;
                }
                &:last-child::after {
                    display: none;
                }
            }
        }
        .plot {
            margin-top: 20px;
        }
        .ratings {
            .rating-wrap {
                display: flex;
                .rating {
                    display: flex;
                    align-items: center;
                    margin-right: 32px;
                    img {
                        height: 32px;
                        flex-shrink: 0;
                        margin-right: 6px;
                    }
                }
            }
        }
        h3 {
            margin: 24px 0 6px;
            color: $black;
            font-family: 'Oswald', sans-serif;
            font-size: 20px;
        }
    }
    @include media-breakpoint-down(xl) {
        .poster {
            width: 300px;
            height: calc( 300px * 3 / 2 );
            margin-right: 40px;
        }
    }
    @include media-breakpoint-down(lg) {
        display: block;
        .poster {margin-bottom: 40px;}
    }
    @include media-breakpoint-down(md) {
        .specs {
            .tit {
                font-size: 50px;
            }
            .ratings {
                .rating-wrap {
                    display: block;
                    .rating {
                        margin-top: 10px;
                    }
                }
            }
        }
    }
}
</style>