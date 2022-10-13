import axios from "axios";
import { findIndex, reject } from "lodash";
import _uniqBy from "lodash/uniqBy";
import { resolveComponent } from "vue";

// 변수명 앞에 _언더바는 이 파일에서만 사용하겟다고 명시적 선언
const _defaultMessage = "Search for the movie title!";

export default {
    // namespaced는 movie.js가 모듈화해서 사용될 수 있다를 명시적으로 선언 
    namespaced: true,
    // data
    state: () => ({ 
        // 초기값
        movies: [],
        message: _defaultMessage,
        loading: false,
        theMovie: {}
    }),
    // computed 계산된 상태
    getters: {
        movieIds(state) {
            return state.movies.map(m => m.imdbId);
            // state.movies.map( function(m) {
            //     return m.imdbId
            // } )
            // state.movies.map( (m) => { return m.imdbId } )
            // state.movies.map( m => m.imdbId )
            // return값은 m.imdbId의 값이 담긴 새 배열 생성
            // state.movies는 state 옵션의 movies라는 데이터 연결
        }
    },
    // mutations는 변이라는 의미로 state에서 가져온 데이터를 변경하는 역할을 하는데 오직 이곳에서만 변경된 데이터를 처리한다. 이 옵션을 사용해 데이터를 변경하면 결코 다른곳에선 수정하는 것이 허용되지 않도록 하기 위함. state에서 가져온 데이터가 다양한 컴포넌트에서 사용될때 각 컴포넌트 모두에서 변경 권한을 주면 관리가 어려워진다. 때문에 mutations 옵션 사용
    mutations: {
        updateState(state, payload) {
            // Object.keys(배열, 객체 데이터) 메소드는 데이터의 키값만을 사용해 새로운 배열 생성
            // Object.keys(payload) = ["movies", "message", "loading"]   
            Object.keys(payload).forEach(key => {
                state[key] = payload[key];
                // state.movies = payload.movies => state["movies"] = payload["movies"]
                // state.message = payload.message => state["message"] = payload["message"]
                // ...
                // state[key] = payload[key]
            });
        },
        resetMovies(state) {
            state.movies = [],
            state.message = _defaultMessage,
            state.loading = false
        }
    },
    // methods
    // actions에서 만들어지는 메소드들은 모두 비동기 방식으로 처리됨
    actions: {
        // state에서 받은 데이터를 각 옵션의 메소드에서 사용하려면 매개변수로 state로 명시해 state의 데이터를 받는데 actions에서 state의 데이터를 받을 땐 다름
        // context를 매개변수로 명시해 
        // searchMovies() {
        //     context.state, 
        //     contex.getters, 
        //     context.commit // mutations을 불러오기 위해
        // }  
        // 이렇게 불어올수 있는데 이를 정리하기 위해 searchMovies({ state, getters, commit })
        async searchMovies(/*context*/{ state, commit }, payload) {
            // 사용자가 영화검색이 종료가 되지 않았는데 계속 검색했을때를 막기 위함
            if( state.loading ) return; 

            commit("updateState", {
                message: "", // 메세지 문자 초기화
                loading: true
            });

            try {
                // const { title, type, number, year } = payload; _fetchMovies() 함수에 있어서 생략 가능
                // 검색 
                const result = await _fetchMovies({
                    ...payload,
                    page: 1
                });
                // console.log(result);
                // Search, totalResult 변수명은 console.log(result); 보면 나옴
                const { Search, totalResults } = result.data; 
                // mutations 옵션 연결 context.commit(메소드명, 데이터)
                /*context.commit*/commit("updateState", {
                    movies: _uniqBy(Search, "imdbID"),
                    //message: "Enjoy movie",
                    //loading: true
                    // loadsh의 _uniqBy(배열, 키명(옵션명))
                    // 키명에 해당하는 데이터 값이 중복되면 중복된 데이터를 지우고 반환
                    // _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
                    // => [{ 'x': 1 }, { 'x': 2 }]
                });
                
                // console.log( Search );
                // console.log( totalResults ); // 310
                // console.log( typeof totalResults ); // string

                // 10진법 정수로 만들기
                const total = parseInt(totalResults, 10);
                // 10을 나눠서 올림처리 
                // 예를 들어 267 / 10 = 26.7 올림 27
                const pageLength = Math.ceil(total / 10);

                // 추가 요청
                if ( pageLength > 1 ) {
                    for( let page = 2; page <= pageLength; page++ ) {
                        if ( page > (payload.number / 10) ) break;
                        const result = await _fetchMovies({
                            ...payload,
                            page // page: page
                        });
                        const { Search } = result.data; 
                        // console.log( [...state.movies, ...Search] );
                        commit("updateState", {
                            movies: [
                                ...state.movies, 
                                ..._uniqBy(Search, "imdbID")
                            ] // 전개연산자
                        });
                    }
                }
            } 
            // catch(message), message는 이전 방식
            // 이전 방식은 내부적 스크립트 간의 상호방식으로 데이터를 주고 받았는데
            // netlify 서버리스 함수를 사용하면 error 메세지가 객체 형태로 전달되니까
            // 에러를 출력하는 코드도 수정해야함
            catch(/*message*//*error*/{ message }){ 
                commit("updateState", {
                    movies: [],
                    // message,
                    // message: error.message
                    message
                })
            } finally {
                commit("updateState", {
                    loading: false
                });
            }
        },
        async searchMovieWithId({ state, commit }, payload) {
            if( state.loading ) return; 

            commit("updateState", {
                // theMovie의 값을 초기화 해야
                // 중복 요청시 기존에 나온 데이터가 출력되지 않는다.
                theMovie: {},
                loading: true
            });

            try {
                const result = await _fetchMovies(payload);
                commit("updateState", {
                    theMovie: result.data
                });
            } catch(error){
                commit("updateState", {
                    theMovie: {}
                })
            } finally {
                commit("updateState", {
                    loading: false
                });
            }
        }
    }
}

// 이름 앞에 _언더바는 이 파일에서만 사용하겠다는 의미
async function _fetchMovies(payload) { 
    /*
    const {title, type, year, page, id} = payload; // 객체 구조분해
    const OMDB_API_KEY = "7035c60c";
    const url = id 
        ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
        : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;
    
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(result => {
                console.log(result);
                if(result.data.Error) reject(result.data.Error);
                resolve(result);
            })
            .catch((err) => {
                reject(err.massage);
            })
    });
    */
    // 위 코드는 functions/movie.js로 이동
    return await axios.post("/.netlify/functions/movie", payload);
}