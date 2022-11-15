import axios from "axios";
import _upperFirst from "lodash/upperFirst";
import _toLower from "lodash/toLower";

export function double(num) {
    return num * 2;
}

export function asyncFn() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Done!");
        }, 2000);
    });
}

export async function fetchMovieTitle() {
    const result = await axios.get("https://omdbapi.com?apikey=7035c60c&i=tt4520988");
    return _upperFirst(_toLower(result.data.Title)); 
    // Frozen II => 전부 소문자로 만들고 앞에만 대문자로 변경해서 => Frozen ii 로 만들려고함
    // 이를 위해 js의 내장함수를 사용해도 되는데 
    // lodash에서 제공하는 기능 사용 가능
    // upperFirst, toLower
}