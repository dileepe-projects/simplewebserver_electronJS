var express = require('express');
var app = express();
const fs = require('fs');
httpServer = require('http').createServer(app);
const path = require('path');
var port = "";
var folderPath = "";

var fileList = [];



app.get('/', function(req, res){
    app.use(express.static(__dirname + '/public'));   
    res.sendFile(path.join(__dirname, 'public/startpage.html'))
       
  });
  


  process.on('message', (msg) => {
     port =  msg.port;
     folderPath = msg.fp;
     
    
     if(msg.start)
     {
      fs.readdir(folderPath, (err, files) => {
        fileList = [];
        files.forEach(file => {          
          fileList.push(file);
          //console.log(file);
        });
        
        process.send({ server: "http://localhost:"+port, fileList: fileList });  
        
      });
       
       app.use(express.static(folderPath));
       httpServer.listen(port);
       console.log("Success: Server running @"+port); 
          
     }
      
    else
    {
      httpServer.close();
      console.log(" Success: Server stopped"); 
    } 
  });

 
  