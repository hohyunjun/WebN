# Node.js & MySQL

## 수업 소개
 - Web2 - Node.js 수업에서 우리는 데이터를 파일에 저장했다. 
 - 파일은 아주 좋은 저장 시스템이다. 운영체제와 상관없이 어디에나 있고, 설치할 필요도 없이 바로 쓸 수 있다.
 - 파일은 아주 단순하기 때문에 파일을 배우는 데 많은 시간이 필요하지 않다.
 - 하지만, 파일은 아래와 같은 단점들이 존재한다.
  + 우리가 가지고 있는 파일이 1억개라고 한다면, 1억개의 파일 안에서 우리가 원하는 내용만을 뽑아내는 것이 쉬울까?
  + 아주 많은 시간이 필요하다. 
  + 우리가 만든 어플리케이션은 제목이 파일의 이름이다. 그리고 파일 하나에 본문 하나만 들어가 있다.
  + 만일 우리가 파일의 제목 뿐만 아니라, 파일 내부 내용이나 파일에 대한 정보를 따로 표현하고 싶다면?
  + 물론 파일을 통해서도 이러한 것을 알아낼 수 있지만, 매우 어렵다.
  + 이외에도 파일의 정렬 등을 하는 일도 우리가 직접 하기에는 매우 까다롭고 어려운 일이다.
  + 이러한 맥락에서 우리를 구원해 줄 수 있는 도구가 데이터베이스이다.
 - 이 수업에서는 MySQL을 데이터베이스로 다룬다. 
  + 그러기 위해서, Web2에서 만들었던 main.js에서 fs 모듈을 사용하는 코드들을 도려내고, 
    node.js 에서 MySQL을 제어하기 위해 고안된 라이브러리를 가져와서 그것을 다루는 코드로 변경할 것이다.
 - 결론적으로, 우리 어플리케이션은 MySQL이 가지고 있는 보안, 안정성, 성능, 동시성 등의 문제들을 단번에 해결할 수 있다.

## MySQL 모듈의 기본 사용법
 - Node.js의 기본 모듈 중에 MySQL을 제어하는 모듈이 있는가? -> 없다
 - 누군가가 만든 모듈이 있는지 살펴본다(NPM) -> nodejs mysql 검색
 - npm에 mysql 모듈이 있다. 다운로드. -> npm install -S mysql 
 - npm의 사용설명 introduction을 보고 실제로 사용해본다. (./nodejs/mysql.js)
 - 원하는 쿼리 결과가 객체 형태로 반환된다.
 - 우리는 쿼리 SQL문을 자바스크립트의 프로그래밍적 능력으로 동적으로 바꿔줌으로써 우리에게 필요한 형태로 변경하여
   데이터를 자동화하여 가져오고 처리할 수 있게 된다. 

## MySQL로 홈페이지 구현 1
 - main.js에서 querystring이 undefined 일 경우에, topic table의 모든 정보를 가져오기
 - main.js에 db connection 정보를 넣어준다.
 - fs.readdir의 내용을 db.query로 바꿔준다.
 - query로는 topic 테이블의 모든 내용을 읽어온다. SELECT * FROM topic;
 - 그리고 callback 함수로는 error와 topic을 인자로 받아온다.
 - template.list의 인자로 topic을 준다. 그럼 객체 리스트가 인자로서 넘어가게 된다.
 - template.js 부분을 객체 리스트를 받는 형태로 수정한다. -> queryString의 값은 topic[i].id가 되고, title 값은 topic[i].title이 된다.
 ```js
 db.query(`SELECT * FROM topic`, function (error, topics, fields) {
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = template.list(topics);
          var html = template.HTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`
          );
          response.writeHead(200);
          response.end(html);
 });
 ```

## MySQL로 상세보기 구현
 - query string이 있을 경우의 코드를 db.query를 이용해 바꿔준다.
 - queryString 값이 id 이므로, query 문은 SELECT * FROM topic WHERE id=${queryData.id} 가 된다.
 - error 처리도 해준다. if(error){throw error;} // error가 존재할 경우, 에러가 있을 경우에 node.js가 그 다음 코드를 실행하지 않고, 에러를 콘솔에 표현하면서 즉시 어플리케이션을 중지시킨다. 
 - title 과 description을 아래와 같이 수정하면 된다.
 ```js
 var title = topic[0].title;
 var description = topic[0].description;
 ```
 - *보안을 위한 더 좋은 방법*
 ```js
 // 기존의 코드
 db.query(`SELECT * FROM topic WHERE id=${queryData.id}}`, function(error2, topic){
 // 더 좋은 코드
 db.query(`SELECT * FROM topic WHERE id=?`,[queryData.id], function(error2, topic){
 ```
 - 기존의 코드를 사용할 경우, 데이터베이스가 가지고 있는 코드의 특성으로 인해 공격을 받을 수 있다.
   사용자가 입력한 정보는 무조건 불신해야 한다. 그러므로 아래와 같은 코드로 바꿔주는 것이 더 안전하다.
   ?의 값이 무엇인지를 두 번째 인자로 배열에 담아서 주는 형태. 
   결과는 같지만, 배열의 내용이 ?에 치환이 되어 들어가는 과정 중에 공격의 의도가 있는 코드들은 세탁해주는 처리를 알아서 해 주므로, 이 방법이 훨씬 좋다.

## MySQL로 글 생성 기능 구현
 - query string이 /create 인 부분과 /create_process 인 부분을 db.query형태로 수정한다.
 - create 부분은 원래 있던 html template에 form 부분만 넣어주면 된다.
 - create_process 부분에는 insert query가 들어가야 한다.
 - query로 Insert 문을 적당히 변수를 이용해서 넣어준 후에, redirection을 하기 위해
   삽입된 행의 아이디를 알아와야 하는데, 이것은 nodejs mysql module의 API를 이용하면 쉽게 해결가능하다.
   db.query를 통해 callback 함수로 받아온 result 내부에 insertId라는 변수가 존재한다. 
   이 변수로 redirection을 걸어준다.
   ```js
   response.writeHead(302, {Location: `/?id=${result.insertId}`});
   ```

## MySQL로 글 수정/삭제 기능 구현
 - fs모듈 형태로 작성된 코드를 db.query 형태로 잘 수정한다.

## MySQL Join - 글 상세보기 구현
 - topic table 과 author table 은 author_id 를 외래키로 하여 관계성을 가지고 있다. 
 - 두 개의 테이블을 합쳐서 보여주려면, JOIN 쿼리를 이용해야 하는데 아래와 같다.
  + SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id;
 - main.js에서 query string이 있는 경우의 db query를 JOIN 문으로 바꿔준다. 
  + 그리고 해당 result의 요소들을 뽑아와서 페이지에 삽입한다.
  ```js
  db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`,[queryData.id], function(error2, topic){
  ```

## MySQL Join - 글 생성하기 구현
 - 먼저, author의 목록을 가져올 수 있어야 한다.
 - db.query(`SELECT * FROM author`, function(error2, authors){ 를 통해 author table의 내용을 가져온다.
 - template 모듈에서 select tag를 넣은 객체를 반환할 수 있도록 수정한다.
  ```js
  authorSelect:function(authors){
    var tag = '';
    for (var i = 0; i < authors.length; i++) {
      tag += `<option value="${authors[i].id}">${authors[i].name}</option>`;
    }
    return `
    <select name="author">
      ${tag}
    </select>`
  }
  ```
 - template.HTML 함수의 body 인자로 author부분을 추가해 주면 끝!!

## MySQL Join - 글 수정 구현
 - 수정의 경우에는 생성보다 복잡하다. <select> 내부에 현재 글의 저자명이 default로 설정되어야 함.
  + 이를 위해서, template.authorSelect로 현재 update로 선택된 topic의 author_id를 두 번째 인자로 준다.
  + 그리고 authors 내부 loop 를 돌면서, author_id 와 같은 경우에 option tag에 'selected'를 추가한다.
 - update_process에 있는 author_id의 값을 post.author로 바꿔주면 완료!!

## 정리정돈 - db접속
 - db 접속 코드를 lib폴더 내부 별도의 파일로 빼준다.
 - 버전 관리 시에는 db.template.js 파일을 만들어서, template파일만 버전관리를 한다.(보안을 위해)
 - 실제로 개발환경을 세팅할 때 db.template.js 파일을 복사해서 db.js 파일에 id/pw 등을 넣고 세팅하여 실행한다.

