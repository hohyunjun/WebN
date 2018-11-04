var M = {
    v: 'v',
    f: function () {
        console.log(this.v);
    }
};
module.exports = M; // M 이 가리키는 객체를 이 모듈 바깥에서 사용할 수 있도록 exports 하겠다. 