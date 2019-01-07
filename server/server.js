const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage}=require('./utils/message')

const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
const publicPath = path.join(__dirname,'../public');
app.use(express.static(publicPath))

io.on('connection',(socket)=>{
    console.log("New user is connected");
    
    socket.emit('newMessage',generateMessage('Admin','Welcome, user'))
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

    socket.on('createMessage',(message,callback)=>{
        io.emit('newMessage',generateMessage(message.from,message.text))
        callback('A\'good');
    })
    
    socket.on('disconnect',()=>{
        console.log("DISCONNECTED");
    })
})

app.get('/',(req,res)=>{
    res.sendFile(publicPath+'/html/index.html')
})
server.listen(port,()=>console.log(`Listening to port ${PORT}`))
