let socket = io();

socket.on('connect',()=>{
    console.log("Connected");
})
socket.on('disconnect',()=>{
    console.log("Bye bye");
})

socket.on('newMessage',(message)=>{
    console.log(message)
    let messageHTML = $(`<li>${message.from}: ${message.text}</li>`)
    $('#messages').append(messageHTML)
})

$('#signIn').on('submit',e=>{
    e.preventDefault();
    socket.emit('createMessage',{
        from:'User',
        text:$('[name=userText]').val()
    },msg=>{
        console.log('Got it!',msg);
    })
})

let sendLocationButton = $('#sendLocation');

sendLocationButton.on('click',()=>{
    if(!navigator.geolocation){
       return alert('Your current browser doesn\'t support geolocation.')
    }
    navigator.geolocation.getCurrentPosition(location=>{
        socket.emit('createGeolocationMessage',{
            latitude:location.coords.latitude,
            longitude:location.coords.longitude
        },msg=>{
            console.log('Got it!',msg);
        })
    },e=>alert(e));
})