const http = require("http");
const url = require('url');
const fs = require('fs');
const LIB = require('./core/lib');
const lib = new LIB();

const DB = require('./core/mongo.lib');
const db = new DB();

const server = http.createServer((req, res) => {
    const httUrl = req.url; 
    const urlParser = url.parse(httUrl);
    // console.log( url.parse(httUrl) );

    const urlObj = urlParser.path.split("/");
    const controller = urlObj[1] + 'Controller';
    const action = urlObj[2];

    try{
        const controllerFile = require('./controller/'+controller); 
                            // require('./controller/usersController'); 
        new controllerFile({req,res,lib,db})[action]();
    }catch(error){
        res.end();
    }




    // if(urlParser.path=="/users/login"){
    //     res.writeHead(200,{'Content-Type':'application/json'});
    //     const result = {
    //         status : 'success',
    //         token : '7657FHGFHGdh764fgh'
    //     }
    //     res.write(JSON.stringify(result) );
    // }

    // if(urlParser.path=="/users/register"){
    //     res.writeHead(200,{'Content-Type':'text/html'})
    //     res.write('<h2>Welcome to Node jS :: Register Page </h2>');
    // }


   
    // res.end();
});

server.listen(4439,()=>{
    console.log( "Server running on http://localhost:4439" )
});

// var a =2;
// var b = 3;
// console.log( 'Hello' , a+b );