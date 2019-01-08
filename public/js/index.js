let socket = io();

socket.on('connect',()=>{
    console.log("Connected");
})
socket.on('disconnect',()=>{
    console.log("Bye bye");
})

const autoScrolling = ()=>{
    let chatBlock = $('#messages');
    let newMsg= chatBlock.children('li:last-child');

    let scrollTop = chatBlock.prop('scrollTop');
    let scrollHeight = chatBlock.prop('scrollHeight');
    let clientHeight = chatBlock.prop('clientHeight');
    let newMsgHeight = newMsg.innerHeight();
    let lastMsgHeight = newMsg.prev().innerHeight();
    
    if(scrollTop+clientHeight+newMsgHeight+lastMsgHeight>=scrollHeight){ //instead of lastMsgHeight you can add just 2
        chatBlock.scrollTop(scrollHeight)
    }
}

socket.on('newMessage',(message)=>{
    let {text,from,createdAt} = message;
    let template = $('#message-template').html();
    let messageHTML = Mustache.render(template,{
        text,
        from,
        createdAt
    })
    $('#messages').append(messageHTML)
    autoScrolling();
})

socket.on('newLocationMessage',(message)=>{
    let {text,from,createdAt,link} = message;
    let template = $('#location-message-template').html();
    let messageHTML = Mustache.render(template,{
        text,
        from,
        createdAt,
        link,
    })
    $('#messages').append(messageHTML)
    autoScrolling();
})

$('#message-form').on('submit',e=>{
    e.preventDefault();
    let input = $('[name=message]');
    socket.emit('createMessage',{
        from:'User',
        text:input.val()
    },msg=>{
        input.val("");
    })
   
})

let sendLocationButton = $('#send-location');

sendLocationButton.on('click',()=>{
    if(!navigator.geolocation){
       return alert('Your current browser doesn\'t support geolocation.')
    }
    sendLocationButton.attr('disabled','disabled')

    navigator.geolocation.getCurrentPosition(location=>{
        sendLocationButton.removeAttr('disabled')
        socket.emit('createGeolocationMessage',{
            latitude:location.coords.latitude,
            longitude:location.coords.longitude
        },msg=>{
            sendLocationButton.removeAttr('disabled')
        })
    },e=>alert(e));
})