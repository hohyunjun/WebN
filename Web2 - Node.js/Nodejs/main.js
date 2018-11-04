// require : 우리가 만들고자 하는 어플리케이션에서 필요로 하는 것들 
// http, fs, url은 모듈 
// 모듈 = nodejs 가 가진 수많은 기능들을 비슷한 것끼리 Grouping한 것 
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function (request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;
    // 이상한 경로가 들어왔을 경우의 처리
    if(pathName === '/'){ 
        if(queryData.id === undefined){
            fs.readdir('./data', function(error, filelist){
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = template.list(filelist);
                var html = template.html(title, list,
                    `<h2>${title}</h2>${description}`, 
                    `<a href="/create">create</a>`);
                response.writeHead(200);
                response.end(html);
            });
            
        } else {
            fs.readdir('./data', function (error, filelist) {
                var filteredId = path.parse(queryData.id).base; // 보안처리
                fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
                    var title = queryData.id;
                    var sanitizedTitle = sanitizeHtml(title);
                    var sanitizedDescription = sanitizeHtml(description,{allowedTags:['h1']});
                    var list = template.list(filelist);
                    var html = template.html(title, list, 
                        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
                        `<a href="/create">create</a>
                         <a href="/update?id=${sanitizedTitle}">update</a>
                         <form action="delete_process" method="post">
                            <input type="hidden" name="id" value="${sanitizedTitle}">
                            <input type="submit" value="delete">
                         </form>`);
                    response.writeHead(200);
                    response.end(html);
                }); // 쿼리 스트링에 따라 
                //response.end(fs.readFileSync(__dirname + url)); // 여기 괄호 안에 어떤 데이터를 넣는가에 따라서 사용자에게 보여주는 내용이 달라진다.
            });
        }
    } else if(pathName === '/create'){
        fs.readdir('./data', function (error, filelist) {
            var title = 'WEB - create';
            var list = template.list(filelist);
            var html = template.html(title, list, `
                <form action="/create_process" method="post">
                    <p><input type="text" name="title" placeholder="title"></p>
                    <p>
                        <textarea name="description" id="" cols="30" rows="10" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>
            `,'');
            response.writeHead(200);
            response.end(html);
        });
    } else if(pathName === '/create_process'){
        var body = '';
        request.on('data',function(data){
            body = body + data;
        });
        request.on('end',function(){
            var post = qs.parse(body); // post 변수에 post정보가 들어간다
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                //에러처리는 신경쓰지 않는다
                response.writeHead(302, {Location : `/?id=${title}`}); // 리다이렉션 head
                response.end();
            });
        });
    } else if(pathName === '/update'){
        fs.readdir('./data', function (error, filelist) {
            var filteredId = path.parse(queryData.id).base; // 보안처리
            fs.readFile(`data/${filteredId}`, 'utf8', function (err, description) {
                var title = queryData.id;
                var list = template.list(filelist);
                var html = template.html(title, list,
                    `
                    <form action="/update_process" method="post">
                        <input type="hidden" name="id" value="${title}">
                        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                        <p>
                            <textarea name="description" id="" cols="100" rows="20" placeholder="description">${description}</textarea>
                        </p>
                        <p>
                            <input type="submit">
                        </p>
                    </form>
                    `,
                    `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
                response.writeHead(200);
                response.end(html);
            }); // 쿼리 스트링에 따라 
        });
    }else if(pathName === '/update_process'){
        var body = '';
        request.on('data', function (data) {
            body = body + data;
        });
        request.on('end', function () {
            var post = qs.parse(body); // post 변수에 post정보가 들어간다
            var id = post.id;
            var title = post.title;
            var description = post.description;
            fs.rename(`data/${id}`,`data/${title}`, function(error){
                //에러처리는 신경쓰지 않는다.
                //위에서 제목을 바꿨으므로 아래는 description 변경
                fs.writeFile(`data/${title}`, description, 'utf8', function (err) {
                    //에러처리는 신경쓰지 않는다
                    response.writeHead(302, {Location: `/?id=${title}`}); // 리다이렉션 head
                    response.end();
                });
            });
            console.log(post);
        });
    } else if (pathName === '/delete_process') {
        var body = '';
        request.on('data', function (data) {
            body = body + data;
        });
        request.on('end', function () {
            var post = qs.parse(body); // post 변수에 post정보가 들어간다
            var id = post.id;
            var filteredId = path.parse(id).base; // 보안처리
            fs.unlink(`data/${filteredId}`, function(error){
                //에러처리는 신경쓰지 않는다
                response.writeHead(302, {Location: `/`}); // 리다이렉션 head
                response.end();
            });
        });
    } else {
        response.writeHead(404);
        response.end("Page you requested doesn't exists!!");
    }
});
app.listen(3000);