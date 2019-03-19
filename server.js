var express = require('express');
var app = express();
httpServer = require('http').createServer(app);
const path = require('path');
var port = "";
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
   
    res.sendFile(path.join(__dirname, 'public/list.html'))
       
  });
  


  process.on('message', (msg) => {
     port =  msg.port;
    
     if(msg.start)
     {
       httpServer.listen(port);
       console.log("Success: Server running @"+port); 
       process.send({ server: "http://localhost:"+port });      
     }
      
    else
    {
      httpServer.close();
      console.log(" Success: Server stopped"); 
    } 
  });

 
  