# Node.js

## 수업의 목적
 - 이전에 만들었던 웹페이지의 문제점 : 웹 페이지의 숫자가 늘어날 수록 수정 작업을 수행하기가 힘들다.
 - 이러한 문제점을 해결해 주는 것이 *Node.js*
 - Node.js를 사용하면 단 하나의 파일(template.js)만을 수정함으로써 전체 웹페이지의 수정이 가능하다. 
 - 이것이 가능한 이유는, 우리가 웹 페이지를 1억개를 저장하고 있는 것이 아니라, 
   사용자가 어떠한 페이지를 요청할 때마다 Node.js 와 같은 기술로 그 순간순간에 
   웹페이지를 프로그래밍적으로 생성해 내기 때문이다.
 - 우리는 Node.js 를 사용해서 우리의 웹사이트로 방문하는 사용자에게 컨텐츠에 
   대한 읽기 뿐만 아니라, 쓰기, 수정, 삭제 작업을 모두 웹을 통해서 할 수 있도록 
   제공할 수 있다.
 - 이러한 것이 가능해 지면서, 사용자들이 직접 자신의 컨텐츠를 웹을 통해 올릴 수 있게 되었고,
   이 때부터 웹은 폭발적인 속도로 팽창하게 되었다. 
 - 이러한 역사적인 순간에 Node.js와 같은 기술들이 놓여있다.
   예를 들자면, PHP, JSP, Python Django, Ruby On Rails 같은 기술들이 있다. 

## Node.js 학습법
 - JavaScript -> Node.js runtime -> Node.js Application

## Node.js 웹서버 만들기
 - Node.js 는 웹서버 기능을 내장하고 있기 때문에 Apache 와 같이 웹서버처럼 기능할 수 있다. 
 - 아래와 같은 코드로 main.js를 만들고 node로 실행시키면(node main.js) 서버로서 동작한다.
 ```js
  var http = require('http');
  var fs = require('fs');
  var app = http.createServer(function (request, response) {
      var url = request.url;
      if (request.url == '/') {
          url = '/index.html';
      }
      if (request.url == '/favicon.ico') {
          response.writeHead(404);
          response.end();
          return;
      }
      response.writeHead(200);
      console.log(__dirname + url); // 현재 dir이름과 url을 합친 내용 출력
      response.end(fs.readFileSync(__dirname + url)); // 이 코드를 통해 우리가 읽어들어야 할 파일을 만들 수 있다.
      // 이 코드에서 사용자에게 전송할 데이터를 만든다.
      // 여기 괄호 안에 어떤 코드를 넣느냐에 따라 사용자에게 전송하는 데이터가 바뀐다.
      // Apache와 같은 웹 서버는 할 수 없고, Node.js나 PHP 또는 Python Django만 할 수 있는 일이다.
      // 프로그래밍적으로 사용자에게 전송할 데이터를 생성한다!!!

  });
  app.listen(3000);
 ```
 - 웹 서버와는 다르게 동작하는 부분이, 위 코드에서 response.end()부분이다.
 - *프로그래밍적으로 사용자에게 전송할 데이터를 생성* 할 수 있다!!
 - 기존의 Apache 등은 할 수 없는 일들.

## JavaScript Template Literal
 - Literal : 정보를 표현하는 방법. 기호.
 - 기존 문자열에서 중간에 변수를 넣거나 (+ 변수명 +), 새로운 라인으로 줄바꿈을 할 경우(\n) 매우 번거로운 과정이 수반된다.
 - 이를 해결해 주는 것이 Template Literal
  + grave accent(`) 를 따옴표 대신에 써서 표현한다. 에디터의 줄바꿈이 그대로 출력되고, 변수는 ${변수명} 을 통해 쉽게 추가할 수 있다.
  + ${} 대괄호 내부에는 변수 뿐만 아니라 간단한 계산식을 넣을 수도 있다.

## Node.js URL의 이해
 - URL의 구성
 ```
 protocol | host(domain) |   port  | path | query string
 http://  opentutorials.org :3000 / main ?  id=HTML&page=12
 ```
 - port?
  + 한 대의 컴퓨터 안에 여러 대의 서버가 있을 수 있다. 
  + 클라이언트가 접속했을 때, 그 중에 어떤 서버에 접속할지가 애매함.
  + 접속 시 포트 번호에 연결된 서버와 통신하게 된다. 
  + 포트 번호의 기본값은 80. 생략 시 포트번호 80에 접속한다. 
 - query string?
  + 우리 수업의 주인공
  + query string의 값을 변경함으로써 웹서버에 어떤 데이터를 전달할 수 있다. 
  + query string의 값은 ? 로 시작하는 것으로 약속되어 있다. 
  + 값과 값 사이에는 &를 사용한다. 
  + 값의 이름과 값은 = 로 구분한다. 
  + 쿼리 스트링의 값에 따라 Node.js를 통해 만든 웹서버가 사용자에게 동적으로 생성한 정보를 전송할 수 있다. 

## Node.js URL 활용
 - 먼저, Node.js 어플리케이션에서 Query String을 알아낼 수 있도록 해야 한다.
 - request.url 을 분석하는 방법(nodejs url parse query string 검색)
 - url 모듈을 import 하고, 아래 코드를 이용하면 쿼리만 parse 가능하다.
 ```js
 var queryData = url.parse(request.url, true).query;
 ```
 - 이 때, queryData는 key:value 형태의 객체이다.
 - 이렇게 얻어낸 Query String의 정보에 따라 웹 페이지를 다른 방식으로 표현할 수 있다.
 - request.end(queryData.id);

## App 제작 - 동적인 웹페이지 만들기
 - template 변수 안에 grave accent(`) 로 둘러쌓여진 html 템플릿을 넣고, 내부에 
   쿼리의 값을 변수 형태로 넣어주면 동적인 웹페이지를 만들 수 있다.
 - 위의 방식을 통해 title은 바꿨는데, 본문은 어떻게 바꿀 수 있을까?

## Node.js 파일 읽기 기능
 - Node.js 에서 어떻게 파일을 읽어올 수 있을까?
 - node.js의 fs 모듈 사용.
  + nodejs.org 의 document를 보고 사용법을 파악하는 것이 중요하다.
 ```js
 var fs = require('fs');
 fs.readFile('sample.txt', 'utf8', function(err, data){
   console.log(data);
 });
 ```

## 파일을 이용해 동적으로 본문 구현하기
 - data라는 폴더를 따로 만들고, HTML, CSS, JavaScript의 본문 정보를 각각 하나의 파일로 만들어 저장한다.
 - fs.readFile 모듈을 이용해서 이 description 정보를 불러온다.
 - 그리고 이 description 정보를 template 변수에 넣어 동적으로 response를 진행한다!

## Node.js 콘솔에서의 입력값
 - process.argv 메소드를 이용해서 입력값을 줄 수 있다.
 ```js
  var args = process.argv;
  console.log(args[2]);

  if(args[2] == 1){
      console.log('Your argument is 1');
  }else{
      console.log('Your argument is not 1');
  }
 ```
 - 위의 코드를 보면, node에서 파일을 실행시키는 명령어 뒤에 오는 인자값은 args 배열의 2번째 요소부터 
   저장이 된다. 이를 활용해서 인자값을 프로그램에서 활용 가능하다.

## App제작 - Not Found 구현
 - url.parse() 데이터에 무엇이 들어있는지 살펴본다
  + pathname : query string을 제외한 path만을 보여준다.
  + path : query string을 포함한 주소
 - pathname을 사용해서 존재하지 않는 경로가 들어왔을 경우의 예외처리를 한다.
 - response.writeHead() 는 서버의 응답코드를 인자로 받아 처리한다. 
  + 200 : OK
  + 404 : NOT FOUND

## Node.js - 파일 목록 알아내기
 - fs.readdir(folder, function(error, filelist){
   console.log(filelist);
 });
 - fs.readdir 은 filelist 를 배열 형태로 가져온다.
 - 이를 통해 데이터를 바꾸었을 때(파일이 추가되었을 때) 알아서 작동하도록 바뀐다.
 - 프로그래머가 데이터가 바뀌었을 때 로직을 변경할 필요가 없게 되었다.

## Node.js - 동기와 비동기 그리고 콜백
 - synchronous vs asynchronous
 - synchronous : 일이 오래 걸리더라도 다음 일을 진행하지 않고 기다리는 방식
 - asynchronous : 일이 오래 걸리는 경우 병렬적으로 동시에 여러가지를 처리하는 방식
 - Node.js 는 비동기적 처리를 하기 위한 좋은 기능들을 가지고 있다.
 - 비동기 방식은 효율적이지만 매우 복잡하다.
 - 코드 레벨에서 이에 대해서 알아보자.
 - fs 모듈에는 readFileSync, readFile을 통해 그 차이를 알아볼 수 있다.
  + readFileSync
   - 수행 결과, A B C 순서로 로그가 찍힌다.
  ```js
  var fs = require('fs');
  console.log('A');
  var result = fs.readFileSync('sample.txt', 'utf8');
  console.log(result);
  console.log('C');
  ```
  + readFile
   - 수행 결과, A C B 순서로 로그가 찍한다.
  ```js
  var fs = require('fs');
  console.log('A');
  fs.readFile('sample.txt', 'utf8', function(err, result){
    console.log(result);
  });
  console.log('C');
  ```
  + readFileSync 는 동기적으로 동작하는 함수이다. return 값을 가진다.
  + readFile은 비동기적으로 동작하는 함수이다. 3번째 인자로 callback function을 가진다.
  + readFileSync는 순차적으로 코드가 실행되지만, readFile 같은 경우는 파일을 읽어오는 시간동안 다른 아래의 다른 코드를 실행하고 있다가 파일을 다 읽어오면 callback 함수가 실행된다.
 - Node.js 의 성능을 제대로 끌어올리기 위해서는 반드시 비동기적인 방식으로 작업을 해야한다.
 - callback?
  + javascript 에서는 함수를 값처럼 취급한다.
  + 어떤 함수의 인자로 함수를 넘겨서, 해당 함수의 실행이 끝나면 인자로 받은 함수를 실행시키도록 할 수 있다.

## Node.js - 패키지 매니저와 PM2
 - package manager
  + software의 생성, 설치, 업데이트, 삭제를 관리해주는 프로그램
  + 우리가 살펴볼 패키지 매니저는 npm
  + PM2 : 우리가 만든 main.js 를 실행시킨다고 했을 때, 그 main.js를 감시하면서
    파일이 수정된 경우 알아서 main.js를 재실행시키는 등의 작업을 수행해 준다. 
 - PM2 설치 및 실행
  + npm install pm2 -g
  + pm2 start main.js
   - pm2를 통해 main.js를 실행시킨다.
  + pm2 start main.js --watch
   - main.js 파일의 내용이 변경되면 알아서 파일을 재실행한다.
  + pm2 list : list all processes
  + pm2 stop [app name] : 작업 중단

## Form
 - 지금까지 우리가 만든 웹 애플리케이션은 데이터 디렉토리에 파일을 생성하면 
   파일을 감지해서 글 목록을 만들어 주고, 또 우리 대신에 HTML 코드를 생성해준다.
 - 그런데, 이렇게 하면 데이터 디렉토리에 접근할 수 있는 것은 자기 자신 뿐이기 
   때문에, 컨텐츠를 생성하는 것은 사이트의 소유자만 할 수 있다.
 - 누구나, 웹을 통해 데이터를 전송하면 그 전송한 데이터를 데이터 디렉토리 안에 
   생성할 수 있는 방법은 없을까?
 - 지금부터 살펴볼 것은 컨텐츠를 사용자가 웹을 통해 생성하고, 수정하고, 삭제하는 방법이다.
 - 그 첫걸음으로 우리가 먼저 볼 것은, 사용자가 서버쪽으로 데이터를 전송하기 위한 
   방식인 HTML의 Form 이라는 기능이다.
   ```html
   <form action="http://localhost:3000/process_create">
    <p><input type="text" name="title"></p>
    <p>
        <textarea name="description" id="" cols="30" rows="10"></textarea>
    </p>
    <p>
        <input type="submit">
    </p>
   </form>
   ```
 - **위의 예시에서 form 이라는 태그는 form 안에 있는 각각의 control 들에 사용자들이**
   **입력한 정보를, submit 버튼을 눌렀을 때 action 속성이 가리키는 서버로**
   **쿼리 스트링의 형태로 데이터를 전송하는 기능이다!!!!!!**
 - 그런데, 어플리케이션에게 title과 description 값을 쿼리 스트링 형태로 전송하는 것이 좋은 방법일까?
 - 우리가 지금 하려고 하는 것은 글을 쓰는 것! 뒤에서는 글을 수정하고 삭제하는 일도 할 예정이다. 
 - 그런데, 그걸 하기 위해서 데이터를 전송할 때 주소에 데이터가 포함이 되어 있다면, 이 주소로 인해 우리 서버에 있는 데이터가 수정되거나 삭제되거나 생성되는 사건이 일어날 수 있다.
 - 그러므로, 서버에서 데이터를 가져올 때(GET)는 ?를 활용한 쿼리 스트링을 사용하고
   서버에 데이터를 생성하거나 수정하거나 삭제할 경우는 필요한 데이터를 URL로 보내면 절대 안 되기 때문에 눈에 보이지 않는 방식으로 보내야 한다.
 - 어떻게????
  + form tag의 method를 POST 방식으로 바꾼다.
  + 이렇게 한 후 submit을 하면 주소에 쿼리 스트링이 포함되지 않는다.
  + 사람 눈에 보이지 않는 방식으로 은밀하게 서버로 전송.
  + 이렇게 전송할 경우 아주 큰 데이터도 전송이 가능하다.
  + 반면에, URL로 데이터를 전송할 경우 URL은 무한히 긴 데이터를 수용하지 않으므로 제한이 있다.
 - 결론적으로, 서버로부터 사용자가 데이터를 가져올 경우 GET방식(method의 default 값)을 사용하고,
   서버에 데이터를 수정, 생성, 삭제같은 경우는 반드시 method를 POST방식으로 해야 한다!!

## App - 글 생성 UI 만들기
 - app 변수 내부의 조건문을 수정하여 /create 서버에 대한 요청이 왔을 경우의 UI를 만들어준다.

## App 제작 - POST 방식으로 전송된 데이터 받기
 - request.on('data', function(data){
 }); : 웹 브라우저가 POST 방식으로 데이터를 전송할 때 데이터가 엄청나게 많으면,
 그 데이터를 한 번에 처리하다가 컴퓨터에 무리가 갈 수 있다. 
 그래서, Node.js 에서는 POST 방식으로 전송되는 데이터가 많을 경우를 대비해서
 request.on 사용방법을 제공한다.
 - 그래서, 데이터를 작은 단위로 나누어서 받게 되는데, 이 데이터를 받을 때마다
   서버는 callback 함수를 호출하기로 약속되어 있다.( data 인자에는 수신한 
   정보가 담기게 된다. )
 - request.on('end', function(){}) 의 경우 데이터 수신이 끝난 경우
 - 결론적으로, request.on() 모듈을 이용해 POST 방식으로 전송된 데이터를 받아 올 
   수 있으며, querystring 모듈을 이용하여 이것을 객체 형태로 parse할 수 있다.
 - parse 된 데이터로부터 title 과 description 정보를 얻을 수 있다.

## App 제작 - 파일 생성과 리다이렉션
 - POST 형태로 전송된 데이터를 data 디렉토리 내부에 파일 형태로 저장하는 방법에 대해 알아본다.
 - nodejs file write
 - fs.writeFile('파일경로', '파일내용', callback 함수) 함수 사용
 - POST 형식으로 전송한 데이터가 파일로 만들어졌다!!!
 - 사용자에게 리다이렉션된 화면을 제공해야겠다.
 - nodejs redirection
 - response.writeHead(302, {Location : `/?id=${title}`}); 과 같은 형태로 writeHead 에 redirection location을
   명시할 수 있다. 302 메세지는 redirection. 
 - redirection 에 성공했다!!!!! 개꿀잼

## App 제작 - 글 수정 링크 생성
 - 기존 templateHTML 함수에 인자를 하나 더 추가한다. 홈 화면일 경우는 update 가 표시되지 않고,
   나머지 글에 대한 웹페이지 화면일 경우만 update만 표시하도록 한다.
 - 그리고 update를 눌렀을 때 레퍼런스 주소를 글 별로 구분하기 위한 처리를 해 준다.
   href = /update?id=${title}

## App 제작 - 글 수정 정보 전송
 - 전송을 해야 하므로 form 태그가 필요하고, 수정하고자 하는 데이터를 미리 넣어놓아야 하므로 read 기능이 필요하다.
 - 기존에 있던 fs.readdir과 fs.readFile 함수와 form tag를 복붙한다.
 - 페이지의 template을 form tag로 변경하는데, 주의해야 할 것은 사용자가 수정한 데이터를 전송할 때 쿼리 스트링을 지정해주는 부분이다.
   사용자가 글의 제목 또한 변경할 수 있으므로, 원래 글의 제목을 저장해 놓아야 한다. 
   <input type="hidden" name="id" value="${title}"> 로 원래 글의 제목을 form에 사용자에게는 보이지 않도록 저장한다.

## App 제작 - 수정된 내용 저장
 - title 이 바뀐 경우 저장되는 file의 이름도 바꿔주어야 한다.
 - fs.rename(oldPath, newPath, callback) 으로 파일 이름을 바꾸고, callback 함수의 내용으로 description을 변경하면 된다.
   description의 내용을 변경하는 함수는 fs.writeFile(Path, 내용, callback)

## App 제작 - 글삭제 버튼 구현
 - 글 삭제의 경우도 link로 구현할 경우 문제가 발생한다.
 - 해당 페이지에서 바로 삭제하도록 구현하기 위해, form을 이용한다.
 - 버튼을 클릭했을 때 delete_process 로, method는 POST 방식으로 이동하도록 구현한다.

## App 제작 - 글 삭제 기능 완성
 - nodejs delete file 검색
 - fs.unlink(path, callback)
 - path에 삭제하고자 하는 path정보를 넣고, callback에는 삭제 이후 리다이렉션 정보를 넣는다.

## JavaScript Syntax : 변수로서의 함수
 - JavaScript에서는 함수를 변수에 담을 수 있다.
  -> 따라서, 함수가 배열이나 객체의 값으로서 할당될 수 있다.
 - 엄청나게 큰 프로젝트를 개발할 때, 객체 내부에 관련된 변수들을 정리함으로써 코드의 복잡성을 낮출 수 있다.
 - 함수를 변수에 담을 수 있으므로, 객체 내부에 관련된 함수 또한 저장할 수 있다.
 - 함수는 값이다. 객체는 값을 담는 그릇이다. 객체에 함수를 담을 수 있다.

## App 제작 - 템플릿 기능 정리하기
 - 템플릿 함수들을 하나의 객체에 넣어 정리한다.
 - 기존의 함수를 통한 방식과 동작 방식은 동일하지만, 내부의 코드를 효율적으로 바꾸는 행위 = 리팩토링
 - 일단은 코드를 짜 놓고, 리팩토링을 자주자주 진행해 주는 것이 좋다

## Node.js 모듈의 형식
 - 코드를 정리해야 할 필요성에 의해 배운 것들 : 배열, 함수, 객체 등등..
 - 이들의 끝판왕이라고 할 수 있는 것이 바로 모듈. 모듈이 가장 큰 정리도구라고 할 수 있다.
 - 많은 객체, 함수들을 정리할 수 있는 도구가 모듈. 
 - 모듈을 이용하면 이러한 것들을 파일로 쪼개서 외부로 독립시킬 수 있다. 
 - 하나의 파일에서 M 이라는 객체를 만들고, 이 객체를 아래와 같이 exports 하면 다른 파일에서 사용가능하다.
  + mpart.js
  ```js
  var M = {
      v: 'v',
      f: function(){
          console.log(this.v);
      }
  }
  module.exports = M; // M 이 가리키는 객체를 이 모듈 바깥에서 사용할 수 있도록 exports 하겠다. 
  ```
  + another file
  ```js
  var part = require('./mpart.js');
  part.f();
  ```
## App 제작 - 모듈의 활용
 - main.js 코드를 모듈화시켜서 깔끔하게 정리한다. 
 - template 부분을 lib 폴더에 별도의 파일로 만들고, module.exports를 할 수 있다.
 - 이런 식으로 다른 부분들도 파일을 쪼개 정리할 수 있다. 

## App 제작 - 입력 정보에 대한 보안
 - 수업의 최종적인 목적은 우리가 만든 웹 어플리케이션을 실제 서비스 환경에서도 쓰도록
   하는 것은 아니다. 왜냐하면, 그렇게 하기 위해서는 이것보다 훨씬 더 많은 대비책들이
   필요하기 때문이다.
 - 우리의 목표는 이래서 보안 문제가 있구나, 보안 문제는 이런 식으로 막을 수 있구나, 
   보안이라는 것이 중요하구나, 하는 것에 대한 감수성을 가지는 것이다. 
 - 우리의 어플리케이션은 어떤 보안적인 위험요소를 가지고 있는지 알아보자.
 - 예를 들어서, 웹 어플리케이션에 사용되지 않는 파일에 대한 정보도 쿼리 스트링으로 볼 수 
   있게 되는 대참사가 일어날 수 있다. 
 - 이 문제를 해결하기 위해 node.js path parse를 검색
 - path 모듈을 이용해서, 사용자로부터 경로가 들어오는 모든 곳의 내용을 바꿔주어야 한다.
   사용자가 입력한 정보(외부에서 들어온 정보)와 우리가 코드로 짠 정보가 아니라 외부에서 들어온
   정보가 바깥으로 나갈 때 모두 오염될 수가 있기 때문에 이 모든 것들은 철저히 의심되어야 한다. 
   이것이 보안의 핵심. 
 - 사용자가 path를 임의로 설정(../ 등을 이용) 하는 것을 방지하기 위해 path.parse().base를 이용해
   path를 filter 해 주어야 한다.
  
## App 제작 - 출력 정보에 대한 보안
 - 오염된 정보가 나갈 때 생길 수 있는 문제점
 - 우리가 만든 페이지에서 create 에 <script> tag 가 들어왔을 때 이러한 문제들이 발생한다.
 - script 태그 내부에 악성 자바스크립트 코드를 작성해서 create 또는 update 할 수 있다. 
 - 이를 활용해 사용자의 로그인 정보를 갈취하는 등의 심각한 행위가 가능하다. 
 - 이를 해결하기 위해 많은 서비스들이 사용자로부터 입력받은 정보를 밖으로 출력할 때는 그 정보에서
   문제가 될 수 있는 것들을 필터링하는 작업을 많이 수행한다. 
 - 어떻게 필터링 할 수 있을까?
  1. Script tag로 되어 있는 것을 아예 지워버린다.
  2. Script 를 tag로 받아들이지 않고 문자열 자체로 읽는다. (검색어 : html entities)
    + tag 에 들어가는  < 와 > 를 &lt; &gt; 로 변경하도록 명령어를 삽입한다.

## App 제작 - 출력 정보에 대한 보안2, NPM
 - 이번 시간의 목적 2가지
  1. 보안 : 사용자가 입력한 정보를 외부로 출력할 때, 오염된 정보가 있다면 그 정보를 소독하는 것.
  2. NPM을 통해서 내가 아닌 다른 사람이 만든 모듈을 사용해서 어플리케이션 빠르게 만들기
 - 1번 목적을 달성하기 위해 필요한 것이 Sanitizing 이다. 
 - npm에서 sanitizing mudule을 찾아본다.
 - npm에서 모듈을 다운받을 때는, 그냥 막 다운받지 말고 평판을 보고 사용하기. 
 - sanitize-html 모듈을 사용해 본다. 
 - 먼저, npm을 시작한다.
  + npm init : npm으로 우리의 application을 관리하기 위한 절차가 시작됨.
  + 자신의 어플리케이션을 package 로써 관리하는 것임.
  + 관련 정보를 모두 입력하면 package.json 파일이 생성되는데, 이는 우리 프로젝트에 대한 정보가 생성된 것이다. 
  + 이제 sanitize-html을 다운받는데, 이전에 pm2 를 -g 옵션으로 깔았던 것과는 다르게,
    sanitize-html 은 -S 옵션으로 다운받는다.
  + -S 옵션은 우리가 진행하는 프로젝트에서 사용할 작은 조각의 프로그램(부품)으로써 다운받게 
    된다. 
  + 이렇게 install을 진행하면 node_modules 라는 디렉토리가 생성되고, 그 안에 오만가지 
    디렉토리가 생기게 된다. 이 중에 우리가 사용할 것은 sanitize-html 디렉토리의 파일들.
  + 그리고, install 후에 package.json 파일을 들어가 보면 의존성 항목(dependencies)이 
    추가된 것을 볼 수 있다. 우리가 만든 프로젝트가 어떠한 외부 소프트웨어들에 의존하고
    있는지를 적어주는 것이다.
  + 이외에 node_modules에 설치된 폴더들은 sanitize_html이 의존하고 있는 소프트웨어들.
  + 이러한 복잡한 의존관계를 npm이 우리 대신에 관리해 주는 것이다!!

## App 제작 - sanitize_html 사용하기
 - npm의 sanitize-html 사용설명을 잘 읽고 사용한다.
 - 우리가 sanitize 할 대상은 description과 title
 - sanitize 작업을 진행한 뒤에 create 작업을 실제 진행해 보면, 실제 파일에는 script tag가 
   들어가 있지만, 실행될 때는 script tag 가 아예 무시된다. 
 - sanitize는 script tag와 같은 예민한 Tag 들을 살균해 버린다.
 - 세부적인 sanitize 설정을 하고싶은 경우, sanitize 함수 호출 시 두번째 인자로 정해진
   양식의 객체를 보내주면 된다. 자세한 내용은 npm description 참조

## API 와 CreateServer
 - API(Application Programming Interface)
 - 우리가 만들고 있는 Web Application은 Node.js 가 가지고 있는 기능들을 호출함으로써 동작한다. 
 - fs.readFile과 같은 함수들은 node.js 를 만든 개발자들이 만들어 놓은 것들이다. 
 - 그리고 이러한 함수들의 조작 방법은, 사용자와 개발자 간의 약속, 즉 Interface이다. 
 - 즉 우리는 fs.readFile 이라는 함수(인터페이스)를 실행시킴으로써 어플리케이션을 만들 수 있게 되는 것이다. 
 - 이렇게, 어플리케션을 프로그래밍 하기 위해 제공되는 인터페이스들을 API 라고 한다. 
 - 이제 나는 어떤 프로그램을 만나던 간에 그 언어가 가지고 있는 조작장치들이 궁금하다면,
   API를 찾거나 검색하는 것을 통해서 문제를 해결할 수 있는 준비가 완전히 끝났다.
 - 이번 시간에는, node.js의 API 문서를 살펴보면서 우리가 바라보는 시야가 얼마나 넓어졌는지를 살펴본다.
 - 우리가 사용했던 http 모듈과 createServer에 대해서 자세히 살펴본다.
 - http.createServer([requestListener])
  + 이를 통해 웹 서버를 만든 것이다. 그리고 이 웹서버로 외부에서 요청이 들어올 때마다, 
    웹 서버는 첫 번 째 인자에 해당하는 함수를 호출하면서, 해당 함수의 첫 번째 파라미터로는 
    웹 브라우저로부터 들어온 요청에 대한 정보를 담는 request 객체를 주고, 두 번재 파라미터로는
    함수 내부의 구현을 통해 코드값이나 실제 내용을 응답할 수 있도록 response 객체를 준다. 
 - server.listen()
  + 요청에 대해서 응답할 수 있도록 http 서버를 구동시키는 API
  + listen 내부에는 여러 값들이 인자로 들어올 수 있지만, 우리는 port number를 준다.  

## 수업을 마치며
 - 지금까지 우리는 JavaScript 와 Node.js 를 이용해서 WebApp을 만드는 방법을 살펴봤다.
 - 이것은 현대적인 WebApp을 만들기 위한 필수적인 요소이면서, 더 나아가 Internet에 대한 매우 중요한 동작
   원리를 알게 된 것이다. 
 - 또 배워볼 만한 몇 가지 주제들
  + Database : 파일의 대체제. DB를 도입하면 데이터 디렉토리에 저장했던 정보를 데이터베이스라고 하는 전문화된
    프로그램에 저장하게 된다. 그렇게 되면, 우리의 웹은 데이터베이스가 가진 엄청난 성능과 보안과 편리함을 
    거저먹는 어플리케이션으로 탈피할 수 있게 된다. Node.js 와 함께 자주 사용되는 데이터베이스로는 MongoDB와 
    MySQL이 있다.
  + Framework : 또 공부해 볼만한 매우 중요한 주제. 각 분야별로 소프트웨어들은 공통적인 부분과 공통적이지 
    않은 부분이 공존한다. 예를 들어, 웹 어플리케이션을 만드는 경우에 사용자의 요청을 처리하는 것, 인증하는 것, 
    보안을 철저히 하는 것, 파일을 서비스하는 것과 같은 것들은 공통적으로 어디에나 사용되는 것들이다. 이렇게 공통
    적인 요소들을 미리 구현해 놓은 것을 Framework라고 생각하면 된다. Framework를 이용하면 자신이 하고자 하는 
    일에 특화된 부분에 집중할 수 있게 된다. 하지만, 프레임워크를 다루기 위해서는 많은 공부가 필요하다.
  + module, API : node.js 가 어떠한 기본적인 모듈을 가지고 있는가 그리고, npm 과 같은 패키지 매니저를 사용해서
    설치해 쓸 수 있는 모듈들이 어떤 것이 있는지를 풍부하게 파악하는 것.
    최근 소프트웨어 분야에서는 *AWESOME*이라는 문화현상이 생겨나고 있다. 개발자들은 AWESOME할 만한 여러 라이브러리들을
    모아 놓은 일종의 북마크들을 최근에 많이 만들고 있다. Node.js AWESOME으로 검색하면 여러가지 결과를 찾아볼 수 있다.
    이런 것들을 이용해서 주목받는 모듈들의 목록을 종종 살펴보는 것이 좋다. 알고 있는 모듈이 많을수록, 해낼 수 있는 일
    또한 많아진다. 
  + 더 많은 것을 배우고 싶다는 충동이 생길텐데, 그 충동이 호기심, 기대감, 희망과 같은 것들이 아니라, 불안감, 자신없음, 
    초조함 등의 감정 때문이라면 지금은 진도를 나가기 좋은 때가 아니다. 그런 상태라면, 지금까지 우리가 짠 코드를 보고 
    다시 코드를 짜보고, 안보고도 짜보고, 혼자서 설명해보고, 남들에게 설명도 해보면서 자꾸 우리의 뇌에 우리가 지금까지 작성한
    코드를 Load 시켜 보는 것이 좋다. 이 과정을 반복하다 보면 어느 순간 폭발적으로 진도를 뺄 수 있는 시간이 온다.
    그 때가 진도를 빼기 좋은 시간이다. 
  