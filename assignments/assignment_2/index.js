const http = require("http");
const fs = require("fs");


fs.writeFile("index.html", "<h1>Hello World</h1>", (err)=>{
    console.log(err);
});


const server = http.createServer((req, res)=>{
    // console.log(req.url);
    res.writeHead(200, {"Content-type" :"text/html"})
    fs.readFile('./index.html', 'utf-8', (err, data)=>{
        if(err){
            console.log(err)
            res.end('Error Occured')
        }else{
            // console.log(data);
            res.end(data)
        }
    })
});

server.listen(3030, ()=>{
    console.log("Server started at 3030");
})
