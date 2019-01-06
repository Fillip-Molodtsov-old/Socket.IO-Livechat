const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT ||3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
const publicPath = path.join(__dirname,'../public');
app.use(express.static(publicPath))

io.on('connection',(socket)=>{
    console.log("New user is connected");
    socket.emit('newMessage',{
        from:"Phil",
        text:"privet",
        createdAt:new Date().toTimeString()
    })
    socket.on('createMessage',(message)=>{
        message.createdAt = new Date().toTimeString();
        console.log(message);
    })
    socket.on('disconnect',()=>{
        console.log("DISCONNECTED");
    })
})

app.get('/',(req,res)=>{
    res.sendFile(publicPath+'/html/index.html')
})
server.listen(PORT,()=>console.log(`Listening to port ${PORT}`))
