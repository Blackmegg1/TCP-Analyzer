const formidable=require('formidable');
const http=require('http');
const { hostname } = require('os');
const url=require('url');
const port=2333;
function start(route,handle){
    function onRequest(request,response){
        let postData="";
        const pathname=url.parse(request.url).pathname;
        request.setEncoding("utf8");
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            // console.log("Received POST data chunk '"+
            // postDataChunk + "'.");
          });
          request.addListener("end", function() {
            route(pathname,handle, response, postData);
            
          });
    }
    http.createServer(onRequest).listen(port);
    console.log(`erver is running on http://${hostname}:${port}`);
}
exports.start=start;