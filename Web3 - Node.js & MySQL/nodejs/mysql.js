var mysql = require('mysql'); // mysql 모듈 사용 선언
var connection = mysql.createConnection({ // createConnection 메소드 호출, 인자로 객체 
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'opentutorials'
});

connection.connect();

// callback 함수의 인자 error, 
connection.query('SELECT * FROM topic', function (error, results, fields) {
    if (error){
        console.log(error);
    };
    console.log(results);
});

connection.end();