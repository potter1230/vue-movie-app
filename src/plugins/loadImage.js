export default {
    // install() 이라는 메소드가 플러그인으로 활용될때 필요한 매개변수 지정 여기선 app

    install(app) {
        // app.config.globalProperties.$플러그인 명
        // 이렇게 플러그인을 만들면 등록을 해야함
        // 등록은 main.js에서 함
        app.config.globalProperties.$loadImage = src => {
            return new Promise(resolve => {
                const imgEl = document.createElement("img");
                imgEl.src = src;
                imgEl.addEventListener("load", () => {
                    // 완료 처리
                    resolve();
                });
            });
        }
    }
}