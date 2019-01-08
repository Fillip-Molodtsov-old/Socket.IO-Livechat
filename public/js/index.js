let socket = io();

socket.on('connect',()=>{
    console.log("Connected");
})
socket.on('disconnect',()=>{
    console.log("Bye bye");
})

socket.on('newMessage',(message)=>{
    let messageHTML = $(`<li>${message.from}: ${message.text}</li>`)
    $('#messages').append(messageHTML)
})

$('#message-form').on('submit',e=>{
    e.preventDefault();
    let input = $('[name=message]');
    socket.emit('createMessage',{
        from:'User',
        text:input.val()
    },msg=>{
        console.log('Got it!',msg);
        input.val("");
    })
   
})

let sendLocationButton = $('#send-location');

sendLocationButton.on('click',()=>{
    if(!navigator.geolocation){
       return alert('Your current browser doesn\'t support geolocation.')
    }
    sendLocationButton.attr('disabled','disabled').text('Sending location')

    navigator.geolocation.getCurrentPosition(location=>{
        sendLocationButton.removeAttr('disabled').text('Send location')
        socket.emit('createGeolocationMessage',{
            latitude:location.coords.latitude,
            longitude:location.coords.longitude
        },msg=>{
            sendLocationButton.removeAttr('disabled').text('Send location')
            console.log('Got it!',msg);
        })
    },e=>alert(e));
})