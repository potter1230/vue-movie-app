exports.handler = async function(event, context) {
    return {
        statusCode: 200,
        // body는 문자열만 전송 가능 예) body: "hello world"
        /* 
        body에 객체데이터를 보내려면
        body: JSON.stringify({
            name: "Yound",
            age: 11,
            email: "asdasd@asdasd.com"
        })
        */
        body: JSON.stringify({
            name: "Yound",
            age: 11,
            email: "asdasd@asdasd.com"
        })
    }
}