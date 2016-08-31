var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var xml = require('xml');

var app = express();
app.use(bodyParser.text({ type: 'text/xml' }))

var feedbackXml = "";

app.get('/parameter', function (request, response){
    console.log("&&&&&&&&&&&&&&&&&&&& PARAM &&&&&&&&&&&&&&&&&&&&&&&&& ");
    response.writeHead(202, {"Content-Type": "text/xml"});
    fs.createReadStream("./parameter.xml").pipe(response)
});

app.get('/ignition', function (request, response){
    console.log("&&&&&&&&&&&&&&&&&&&& PARAM &&&&&&&&&&&&&&&&&&&&&&&&& ");
    response.writeHead(202, {"Content-Type": "text/xml"});
    fs.createReadStream("./MOD_http_com.xml").pipe(response)
});

app.get('/feedback', function (request, response){
    console.log("&&&&&&&&&&&&&&&&&&&& FEEDBACK &&&&&&&&&&&&&&&&&&&&&&&&& ");
    response.header("Content-Type", "text/xml");
    response.send(feedbackXml);
});

app.post('/', function (request, response){
    console.log("[200] " + request.method + " to " + request.url);
    console.log(request.body);
    feedbackXml = request.body;
    response.send("200");
});

http.createServer(app).listen(8888);
console.log("server running...");

module.exports = app;