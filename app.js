
const app = require('express')()
const http = require('http').createServer(app)
const cors = require('cors');
app.use(cors({
  origin: "*"
}))
const io = require('socket.io')(http, {
  cors: {
      origin: "*",
      methods: "*",
      allowedHeaders: "*",
      credentials: false
  }
});
const path = require('path');
const fs = require('fs')
const dir = './pic'
var imgValue 

io.on('connection', (socket) => {

    socket.on('RecieveBs64FromAI', (b64Img) => {
    // console.log(b64Img)
        if(b64Img){
        imgValue = b64Img.image;
        socket.emit('pong')
        }
        // socket.emit('client-responeSteam', "data:image/jpeg;base64,"+ b64Img.toString("base64"));
    });

    socket.on('MonitorSteamimg', (msg) => {
    socket.emit('clientResponeSteam', "data:image/jpeg;base64,"+ imgValue);
  });



})

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