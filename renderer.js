
document.addEventListener("DOMContentLoaded", function(event) {
    // Your code to run since DOM is loaded and ready
    const startServer = document.getElementById('start');
    const stopServer = document.getElementById('stop');
    const path = require('path');
    const { fork } = require('child_process');
    const ps = fork(path.join(__dirname, 'server.js'))

    const serverSwitch = document.getElementById("serverSwitch");


    serverSwitch.addEventListener('click', event => {
        if (serverSwitch.checked){
            var portNo = document.getElementById('portNo').value;  
            if(portNo=="")
            {

            }    
            else{
                ps.send({start:true, port:portNo});
                ps.on('message', (msg) => {
                 
                    document.getElementById('urls').innerHTML = "<a href='#'>" +msg.server+ "</a>";
                  
                }); 
            }      
               
        }
    
        else {
            ps.send({start:false});
            document.getElementById('urls').innerHTML = "";
        }
    });

});
