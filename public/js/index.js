let socket = io();
socket.on('connect',()=>{
    console.log("Connected");
})
socket.on('disconnect',()=>{
    console.log("Bye bye");
})

socket.on('newMessage',(message)=>console.log(message))

socket.emit('createMessage',{
    from:"Alex",
    text:"BLABLA"
})