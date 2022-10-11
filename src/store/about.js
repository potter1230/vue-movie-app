/*
store 기본설정
export default {
    // namespaced는 이 파일이 모듈화해서 사용될 수 있다를 명시적으로 선언 
    namespaced: true,
    // state는 상태를 정의
    // 이 상태는 데이터이고 데이터는 함수로 만들어준다.
    // 이렇게 데이터를 함수로 만드는 이유는 객체 데이터는 배열과 동일하게 참조형 데이터이고 그래서 데이터의 불편성을 유지하려면 함수로 만들어 반환해야지 그때그때 state라는 속성에서 사용되는 데이터가 고유해질 수 있음
    state: () => {
        return {
            // 데이터 정의
        }
    }
    // 위에걸 줄이면 state: () => ({}) 객체데이터를 리턴할땐 괄호안에 중괄호 ({})
}
*/

export default {
    namespaced: true,
    state: () => ({
        name: "Young",
        email: "young@good.com",
        site: "https://donner.com",
        phone: "+82-10-1234-5678",
        image: "https://donner.co.kr/assets/img/common/logo.png",
        mImage: "https://donner.co.kr/assets/img/common/logoM.png"
    })
}