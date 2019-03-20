var express = require('express');
var app = express();
const fs = require('fs');
httpServer = require('http').createServer(app);
const path = require('path');
var port = "";
var folderPath = "";
app.use(express.static(__dirname + '/public'));
var fileList = [];



app.get('/', function(req, res){
   
    res.sendFile(path.join(__dirname, 'public/list.html'))
       
  });
  


  process.on('message', (msg) => {
     port =  msg.port;
     folderPath = msg.fp;
     
    
     if(msg.start)
     {
      fs.readdir(folderPath, (err, files) => {
        files.forEach(file => {          
          fileList.push(file);
          //console.log(file);
        });
        process.send({ server: "http://localhost:"+port, fileList: fileList });  
        
      });
       httpServer.listen(port);
       
       console.log("Success: Server running @"+port); 
          
     }
      
    else
    {
      httpServer.close();
      console.log(" Success: Server stopped"); 
    } 
  });

 
  