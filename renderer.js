
document.addEventListener("DOMContentLoaded", function(event) {

    const { ipcRenderer } = require('electron')
    
    // Your code to run since DOM is loaded and ready
    
    const path = require('path');
    const { fork } = require('child_process');
    const ps = fork(path.join(__dirname, 'server.js'));
    
    var folderName = "None";
    var folderPath = "";
    const serverSwitch = document.getElementById("serverSwitch");
    const runInBackground = document.getElementById("backgroundRun");
    var portNo = document.getElementById('portNo').value;
    serverSwitch.disabled = true; //disable the switch initially
   

    
    document.getElementById('folderSelect').addEventListener('click', _ => {
        document.getElementById('folderName').textContent = folderName;
        document.getElementById('folder').click();
      })

      document.getElementById('folder').addEventListener('change', e => {
        folderName = e.target.files[0].name;
        document.getElementById('folderName').textContent = folderName;
        folderPath = e.target.files[0].path; 
        serverSwitch.disabled = false; //enable the switch once folder is selected
        
      })
    

    serverSwitch.addEventListener('click', event => {
        if (serverSwitch.checked){
            portNo = document.getElementById('portNo').value;              
            if(portNo=="")
            {

            }
            else if(folderPath=="")
            {

            }
            else{
                document.getElementById("status").textContent = "Started";
                ps.send({start:true, port:portNo, fp:folderPath});
                ps.on('message', (msg) => {
                 
                    
                    /*var files = "";
                    for(var i=0; i<msg.fileList.length; i++)
                    {
                        files = files + "\n" + msg.fileList[i];
                        
                    }
                    document.getElementById("filelist").value = files;*/
                    document.getElementById("filelist").value = msg.fileList.join("\n");
                    document.getElementById('urls').innerHTML = "<a href='#'>" +msg.server+ "</a>";

                }); 
            }      
               
        }
    
        else {
            document.getElementById("status").textContent = "Stopped";
            ps.send({start:false});
            document.getElementById('urls').textContent = "";
            document.getElementById("filelist").value = "";
        }
    });


    runInBackground.addEventListener('click', event => {
        if(runInBackground.checked)
        {
            ipcRenderer.send('asynchronous-message', true);
        }
        else ipcRenderer.send('asynchronous-message', false);
    });

});
