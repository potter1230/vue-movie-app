module.exports = {
    // 파일 확장자를 지정하지 않은 경우, Jest가 검색할 확장자 목록
    // 일반적으로 많이 사용되는 모듈의 확장자를 지정
    // ex) `import HelloWorld from '~/components/HelloWorld';`
    moduleFileExtensions: [
        "js",
        "vue"
    ],
    
    // `~` 같은 경로 별칭을 맵핑
    // `<rootDir>` 토큰을 사용해 루트 경로를 참조할 수 있음
    // ex) `import HelloWorld from '~/components/HelloWorld';`
    moduleNameMapper: {
        // ^~/(.*)$: ^(캐럿)은 문자의 시작을 의미, ~(틸드)/를 매칭, (.*) .은 임의의 문자 뒤에 *은 최대한 많이 일치시킨다는 의미, $는 끝
        // $1은 모든 경로를 맵핑
        "^~/(.*)$": "<rootDir>/src/$1"
    },

    // 일치하는 경로에서는 모듈을 가져오지 않는다.
    // `<rootDir>` 토큰을 사용해 루트 경로를 참조할 수 있음
    modulePathIgnorePatterns: [
        "<rootDir>/node_modules",
        "<rootDir>/dist"
    ],

    // jsdom 환경(쉽게말해 HTML 환경)에 대한 URL을 설정
    // https://github.com/facebook/jest/issues/6766
    testURL: "http://localhost",

    // 정규식과 일치하는 파일의 변환 모듈을 지정
    transform: {
        "^.+\\.vue$": "vue-jest",
        "^.+\\.js$": "babel-jest"
    }
}