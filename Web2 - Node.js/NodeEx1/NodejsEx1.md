# Node.js 직접 실습하면서 기록

1. __dirname 은 현재 node 명령어가 실행된 디렉토리명을 가리킨다.
2. request.url 에는 포트 번호 이후에 오는 경로 정보가 담기게 된다.
3. node 에서 동적으로 웹 페이지를 만들어 주기 위해 쿼리 스트링을 이용한다.
  - 쿼리 스트링의 parse는 var queryData = url.parse(request.url, true).query; 를 이용한다.
  - query string은 id=value형태이다.
  - 위에서 queryData는 객체 형태이다.
  - 동적으로 웹 페이지를 생성하는 이유? : 모든 웹 페이지를 하나의 파일로 유지하는 것은 비효율적임.(중복)
4. Create 버튼 만들기
  -  form 을 이용해서 브라우저에서 서버로 요청을 보내도록 한다.
  - 브라우저에서 보낸 form을 parse 하기 위해, var qs = require('querystring'); 을 한 후, qs.parse를 이용한다.
  - 브라우저에서 보낸 form의 내용을 받아오기 위해서는 request.on('data', function(){}) 과 request.on('end', function(){}) 을 이용한다.
  - parse 한 post의 내용을 이용해서 data 폴더에 파일을 추가한다. fs.writeFile()
  - writeFile을 수행한 이후에는 redirection을 수행한다. response.writeHead(302, {Location:`/?id=${title}`});
5. Update 버튼 만들기
  - create와 마찬가지로 form tag를 이용해서 서버로 요청을 보낸다.
  - form tag를 만들 때, hidden을 사용해서 바뀌기 전의 title 값을 input tag로 하나 만들어 둔다.
  - process_update 에서는 바뀌기 전의 데이터 파일에 접근하여 rename을 먼저 수행해야 한다(fs.rename())
  - fs.writeFile() 은 파일에 기존에 있던 내용은 무시하고 새로 입력된 내용을 덮어쓰기한다.
6. Delete 버튼 만들기
  - delete는 사용자로부터 입력 받아야 할 것이 따로 없음. 버튼만 만들어 주면 됨.
  - 따라서, 바로 /process_delete 로 보내주는 action을 포함하는 form tag를 넣어준다.
  - 파일의 삭제는 fs.unlink()를 사용한다.
  - 삭제 후에는 홈으로 redirection
7. module로 만들어 exports하기
  - 특정 객체를 하나의 파일로 만들어 module.exports = 객체명 를 한 뒤, 사용하려는 파일에서 require를 써서 사용가능하다.
8. 입력 정보에 대한 보안
  - 사용자로부터 웹 페이지가 아닌 다른 경로에 대한 요청이 들어올 경우, 보안적인 문제가 발생한다.
  - 이를 해결하기 위해 path 모듈을 사용한다.
  - fs.readFile(), fs.unlink() 에 들어가는 파일 경로를 filtering 해준다.