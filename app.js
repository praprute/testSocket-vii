//const app = require('express')()
const http = require('http').createServer(app)
const cors = require('cors');
const express      = require('express')
const app          = express()
const test = require('./routes/routeall')

app.use(cors({
  origin: "*"
}))
app.use(express.json())
const io = require('socket.io')(http, {
  cors: {
      origin: "*",
      methods: "*",
      allowedHeaders: "*",
      credentials: false
  }
});
// const path = require('path');
// const fs = require('fs')
// const dir = './pic'
// var imgValue 
// var receiver = null

io.on('connection', (socket) => {
    var id = socket.id;  
//    socket.emit("GetID", id)
//    socket.on('SetReceiverID', (id) => {
//	  console.log("SetReceiverID",id)
 //      receiver = id
 //   })
    socket.on('RecieveBs64FromAI', (b64Img) => {
    // console.log(b64Img)
        if(b64Img){
        imgValue = b64Img.image;
        socket.emit('pong')
        }
        // socket.emit('client-responeSteam', "data:image/jpeg;base64,"+ b64Img.toString("base64"));
    });


    socket.on('MonitorSteamimg', (msg) => {
      
	  socket.broadcast.emit('clientResponeSteam', msg)
    console.log('message : ', msg)
    // socket.emit('clientResponeSteam', "data:image/jpeg;base64,"+ msg);
    // socket.emit('clientResponeSteam', msg)
  });
})

app.use('/api', test)

http.listen(4001, function() {
  console.log('listening on port 4001')
})



 // const testFolder = './pic/';
        // fs.readdir(testFolder, (err, files) => {
        //     files.forEach(file => {
        //     setTimeout(function() {
        //     fs.readFile(`./pic/${file}`, function(err, data){
        //             socket.emit('client-connect', "data:image/jpeg;base64,"+ data.toString("base64"));
        //         // socket.emit('imageConversionByClient', { image: true, buffer: data });
        //         // socket.emit('client-connect', "data:image/png;base64,"+ data.toString("base64"));
        //       });
        //     });
        // }, 2000);
        //   });
