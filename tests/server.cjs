const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname,'..');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.mp3':'audio/mpeg'};
http.createServer((req,res) => {
  const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file = path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if (!file.startsWith(root+path.sep) || pathname.includes('/.')) {res.writeHead(403);res.end();return;}
  fs.readFile(file,(err,data) => {
    if(err){res.writeHead(404);res.end('Not found');return;}
    const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','Accept-Ranges':'bytes'};
    const range=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range||'');
    if(range){
      const start=Number(range[1]),end=Math.min(range[2]?Number(range[2]):data.length-1,data.length-1);
      if(start>end){res.writeHead(416);res.end();return;}
      res.writeHead(206,{...headers,'Content-Length':end-start+1,'Content-Range':`bytes ${start}-${end}/${data.length}`});
      res.end(data.subarray(start,end+1));return;
    }
    res.writeHead(200,{...headers,'Content-Length':data.length});res.end(data);
  });
}).listen(8765,'127.0.0.1');
