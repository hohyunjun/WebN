# MySQL

## MySQL의 구조
 - table
 - database / schema : table들을 grouping하는 일종의 폴더. 연관된 table들의 grouping
 - database server : schema / database 들의 묶음. 
 - 데이터베이스 서버 내부에 스키마가 있고, 스키마 내부에 테이블이 있다.

## 데이터베이스의 장점
 - 보안 : 데이터베이스는 자체적인 보안 체계를 가지고 있기 때문에, 파일보다 안전하게 데이터를 보관할 수 있다. 
  + 권한 기능 : 사용자 별로 권한을 설정해 줄 수 있다.
 - 일반적으로 처음 사용되는 root는 관리자 개념으로, 모든 권한을 가지고 있다.
 - mysql -uroot -p 를 통해 접속하면, database server에 접속한 것이다.

## 데이터베이스 스키마의 사용
 - CREATE DATABASE (DBNAME);
 - USE (DBNAME);
 - 여기까지 하면 database(스키마)에 접속한 것이다. 

## SQL과 테이블의 구조
 - SQL의 특징 : 쉽다, 중요하다.
 - 관계형 데이터베이스 시스템의 대부분이 SQL을 사용한다.
 - 테이블의 행은 row, record
 - 테이블의 열은 column

## 테이블의 생성
 - create table in mysql cheat sheet 검색
 - CREATE TABLE (테이블명);
 - MYSQL DATATYPE 을 찾아보고 알맞은 자료형으로 컬럼 만들기

## MySQL CRUD
 - 특히 중요한 것은 Create 와 Read.
 - Create
  + INSERT INTO (TABLENAME) (입력할 속성명 나열) VALUES('', '', '' ...);
 - READ
  + SELECT * FROM (TABLENAME);
  + SELECT (PROJECTION 속성명) FROM (TABLENAME);
  + SELECT (PROJECTION 속성명) FROM (TABLENAME) WHERE (조건절);
  + SELECT (PROJECTION 속성명) FROM (TABLENAME) WHERE (조건절) ORDER BY (정렬기준 오름차순 또는 내림차순));
  + SELECT * FROM (TABLENAME) LIMIT (숫자); : 원하는 숫자만큼의 ROW만 출력
 - UPDATE
  + UPDATE (TABLE NAME) SET (속성명='값', 속성명='값'...) WHERE (조건절); 바꾸려는 행에 대한 조건절을 걸어서 수정.
  + Where 문 빼먹지 않도록 주의!!
 - DELETE
  + DELETE FROM (TABLE NAME) WHERE (조건절);

## 관계형 데이터베이스의 필요성
 - 테이블의 중복을 없애기 위해 정규화를 할 수 있다.
 - 데이터베이스의 저장을 분산해서 하고, 볼 때는 합쳐서 볼 수 있다.
 - 관계형 데이터베이스의 꽃 JOIN
  + SELECT * FROM (TABLE NAME) LEFT JOIN (TABLE NAME) ON (JOIN 조건);

## 인터넷과 데이터베이스
 - MySQL은 내부적으로 인터넷을 사용할 수 있도록 고안되었다. 
 - 위에서 설명한 Database Server 에서 Server의 의미는?
 - 인터넷이 동작하기 위해서 필요한 컴퓨터의 최소 개수? 2대
  + 인터넷의 의미는, 각자 흩어져 있던 컴퓨터들이 인터넷으로 연결되면서 컴퓨터들간의 사회가 만들어진 것.
  + 한 대의 컴퓨터가 가지는 한계를 초월하게 되었다.
  + 한 대의 컴퓨터는 또 다른 컴퓨터에 정보를 요청하고, 다른 한 대는 그 정보를 응답한다. 
  + Web browser 와 Web Server | Client 와 Server
  + MySQL 에도 database client 와 database server가 있다.
  + 지금까지 우리가 다뤘던 것은 database client
  + mysql이라고 하는 명령어를 통해 접속했던 mysql monitor는, mysql을 만든 사람들이 mysql 서버에 접속할 수 
    있도록 기본적인 번들로써 제공하는 클라이언트이다. mysql monitor는 명령어를 통해서 데이터베이스 서버를 
    제어하는 프로그램.
  + 대표적인 client 측 프로그램인 mysql workbench를 살펴본다.
  + mySQL monitor나 mySQL workbench와 같은 프로그램을 통해서 전 세계에 있는 수많은 사람들이 하나의 데이터베이스
    서버를 이용해서 여러가지 정보를 서로 주고받고 관리할 수 있다.

## MySQL Client
 - MySQL Monitor
  + MySQL Server 가 설치되면 함께 설치된다. 
  + GUI가 아니라, 명령을 이용해서 제어하는 명령어 기반 프로그램(CLI)이다.
  + 단점?
   - 명령어를 기억해야 한다.
 - MySQL Workbench
  + GUI 기반 프로그램. 

## MySQL Workbench
 - MySQL Monitor 명령어와 비교하면서 기능들을 살펴본다.
 1. 접속
  - mysql -uroot -p -hlocalhost
  - -h 뒤에 오는 것은 호스트 정보. 인터넷을 통해 다른 컴퓨터에 있는 mysql 서버에 접속하려면 -h 뒤에 서버에 해당하는
    컴퓨터의 주소를 적어주면 된다.
  - 지금 우리는 mysql client 와 server 가 같은 컴퓨터에 위치하므로 localhost(127.0.0.1)를 사용한다. 
  - -h를 생략하면 묵시적으로 localhost server에 접속한다. 
 2. GUI를 통해 스키마와 테이블 생성
  - APPLY 를 누르면 SQL이 생성되는데, 이 SQL을 MySQL Server에 전송함으로써 데이터베이스 서버를 제어하게 된다. 
 - Workbench는 이외에도 다양한 기능들을 가지고 있음. 
 - MySQL Server 를 끄거나 , 켤 수 있고, 성능 정보를 볼 수도 있음.
 - Data Export도 가능하다.
 - 중요한 것은, MySQL Server가 있고, MySQL Client가 있다는 것을 이해하는 것이다.
 - 세상에는 정말 많은 MySQL Client가 있고, MySQL Server를 사용하고 있는 모든 웹 어플리케이션과 앱 등은 본질적으로는 
   모두가 MySQL Client 이다. 

## 더 공부해볼 만한 주제들
 - Index
 - Database modeling : 정규화, 역정규화 등
 - backup : mysqldump, binary log 등
 - cloud : 큰 회사들이 운영하고 있는 인프라 위의 컴퓨터를 임대해서 사용하는 것.(Amazon, naver 등)
  + 필요할 때만 사용할 수 있다. 안 쓸 경우는 끌 수 있다.
  + backup 적인 측면도 Cloud에서 다 관리해준다.
  + AWS RDS, Google Cloud SQL for MySQL, Azure Database for MySQL 등의 클라우드 서비스가 있다.
 - programming : 현대에는 데이터베이스를 부품으로 해서 여러가지 정보 시스템이 완제품으로 만들어진다.
  우리가 사용하고 있는 수 많은 웹과 어플리케이션 등은 데이터베이스를 부품으로 사용하고 있을 가능성이 크다.
  + Python mysql api, Java mysql api, PHP mysql api 등으로 검색하면 해당 언어로 데이터베이스 시스템을 쉽게 핸들링 가능하다.
**공부의 목표는 이해가 아니라 익숙해 지는 것이다**
