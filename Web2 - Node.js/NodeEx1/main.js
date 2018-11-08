var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');

var app = http.createServer(function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;
    var title = queryData.id;
    if(pathName == '/'){
        if(queryData.id === undefined){ // 쿼리데이터가 없을 경우
            title = 'Welcome';
            description = 'Node.js Example';
            fs.readdir('./data', 'utf8', function(error, filelist){
                var list = template.List(filelist);
                var html = template.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">create</a>`);
                response.writeHead(200);
                response.end(html);
            });
        }else{
            fs.readdir('./data', 'utf8', function(error, filelist){
                var filteredID = path.parse(queryData.id).base;
                var list = template.List(filelist);
                fs.readFile(`./data/${filteredID}`, 'utf8', function (err, description) {
                    var html = template.HTML(title, list, `<h2>${title}</h2>${description}`,
                     `<a href="/create">create</a> | <a href="/update?id=${title}">update</a> |
                      <form action="/process_delete" method="post">
                        <input type="hidden" name="id" value="${title}">
                        <input type="submit" value="delete">
                      </form>`);
                    response.writeHead(200);
                    response.end(html);
                });
            });
        }
    }else if(pathName === '/create'){
        fs.readdir('./data','utf8',function(error, filelist){
            var list = template.List(filelist);
            var title = "Web - Create";
            var body = `
                <form action="/process_create" method="post">
                    <p>
                        <input type="text" name="title" placeholder="title">
                    </p>
                    <p>
                        <textarea name="description" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit" value="create">
                    </p>
                </form>
            `;
            var html = template.HTML(title, list, body, `<a href="/create">create</a>`);
            response.writeHead(200);
            response.end(html);
        }); 
    }else if(pathName === '/process_create'){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, function(error){
                response.writeHead(302,{Location:`/?id=${title}`});
                response.end();
            });
        });   
    }else if(pathName === '/update'){
        fs.readdir('./data', 'utf8', function (error, filelist) {
            var filteredID = path.parse(queryData.id).base;
            var list = template.List(filelist);
            fs.readFile(`./data/${filteredID}`, 'utf8', function (err, description) {
                var html = template.HTML(title, list, `
                    <form action="/process_update" method="post">
                        <input type="hidden" name="id" value="${title}">
                        <p>
                            <input type="text" name="title" placeholder="title" value="${title}">
                        </p>
                        <p>
                            <textarea name="description" placeholder="description">${description}</textarea>
                        </p>
                        <p>
                            <input type="submit" value="update">
                        </p>
                    </form>
                `,
                    `<a href="/create">create</a> | <a href="/update?id=${title}">update</a>`);
                response.writeHead(200);
                response.end(html);
            });
        });
    }else if(pathName === '/process_update'){
        var body = '';
        request.on('data', function (data) {
            body = body + data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            fs.rename(`data/${id}`, `data/${title}`, function(error1){
                fs.writeFile(`data/${title}`, description, function (error2) {
                    response.writeHead(302, { Location: `/?id=${title}` });
                    response.end();
                });
            });
        });   
    }else if(pathName === '/process_delete'){
        var body = '';
        request.on('data', function (data) {
            body = body + data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            var filteredID = path.parse(id).base;
            fs.unlink(`data/${filteredID}`, function(error){
                response.writeHead(302, {Location:`/`});
                response.end();
            });
        });   
    }else{
        response.writeHead(404);
        response.end('Not Found');
    }
});

app.listen(3001);