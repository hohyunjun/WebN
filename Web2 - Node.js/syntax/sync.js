var fs = require('fs');

// // readFileSync
// console.log('A');
// var result = fs.readFileSync('sample.txt', 'utf8');
// console.log(result);
// console.log('C');

// readFile (sync 가 없는 것이 비동기)
// readFileSync 는 return 값을 주지만, 
// readFile은 return 값이 없다. 대신에, 3번째 인자로 콜백 함수를 줘서
// readFile 후에 해당 함수를 실행시킨다.
// callback 함수의 첫번째 인자는 error, 두번째 인자는 읽은 결과
console.log('A');
fs.readFile('sample.txt', 'utf8', function(err, result){
    console.log(result);
});
console.log('C');