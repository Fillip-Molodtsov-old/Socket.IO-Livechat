const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage}=require('./utils/message')
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
const publicPath = path.join(__dirname,'../public');
app.use(express.static(publicPath))

let users = new Users();

io.on('connection',(socket)=>{
    socket.on('join',(params,callback)=>{
        let {name,room} =params;
        if(!isRealString(name) || !isRealString(room)){
             return callback('Name or room name are required')
        }
        socket.join(room);

        users.removeUser(socket.id);
        users.addUser(socket.id,name,room);
        io.to(room).emit('updateUserList',users.getUserList(room))
        socket.emit('newMessage',generateMessage('Group',`Welcome, ${name}`))
        //socket.broadcast.to(room).emit('newMessage',generateMessage(name,'I have joined'));
        
        callback();
    })

    socket.on('createMessage',(message,callback)=>{
        let user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name,message.text))
        }else{
            callback('Blank field');
        }
        
        callback();
    })

    socket.on('createGeolocationMessage',(message,callback)=>{
        let user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,message.latitude,message.longitude))
        }else{
            callback('There is a problem')
        }
        
        callback()
    })
    
    socket.on('disconnect',()=>{
        let removedUser = users.removeUser(socket.id);
        if(removedUser){
            io.to(removedUser.room).emit('updateUserList',users.getUserList(removedUser.room));
            //io.to(removedUser.room).emit('newMessage',generateMessage(removedUser.name,'I have left'));
        }  
    })
})

app.get('/',(req,res)=>{
    res.sendFile(publicPath+'/app/index.html')
})
server.listen(port,()=>console.log(`Listening to port ${port}`))
