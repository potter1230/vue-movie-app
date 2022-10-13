// 가져오기 (= import)
const axios = require("axios");
// 환경변수 
// const OMDB_API_KEY = process.env.OMDB_API_KEY;
const { OMDB_API_KEY } = process.env;

exports.handler = async function(event, context) {
    // 여기서 console.log로 찍어보면 터미널에서 확인가능함, 브라우저 확인 x
    console.log(event);
    // JSON 문자열을 객체로 변환
    // store/movie.js의 _fetchMovies() 메소드의 axios 요청을 하면 
    // 여기서 응답하는데 그때 데이터를 주고 받을때 여러가지 문제가 잇을수 있기에 데이터는 문자열로 주고 받는다.
    // 그래서 body의 데이터는 모두 문자열이다. 이 문자열 형태의 객체 데이터를 사용하려면 문자열을 다시 객체로 바꿔야함 그때 JSON.parse 사용
    const payload = JSON.parse(event.body); 
    const {title, type, year, page, id} = payload; // 객체 구조분해
    // const OMDB_API_KEY = "7035c60c"; // 환경변수로 구성
    const url = id 
        ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
        : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;

    try {
        const { data } = await axios.get(url);
        if( data.Error ) {
            return {
                statusCode: 400,
                body: data.Error
            }
        }
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch(error) {
        return {
            // response.status 이런거 어디서 아냐면 axios github 문서에서 확인가능
            statusCode: error.response.status,
            body: error.message
        }
    }
    /*
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
}