const generateMessage = (from,text)=>{
    return{
        from,
        text,
        createdAt:new Date().getTime()
    }
}

const generateLocationMessage = (from,latitude,longitude)=>{
    return{
        from,
        text:`<a href="https://www.google.com/maps?${latitude},${longitude}" target="_blank">My location</a>`,
        createdAt:new Date().getTime()
    }
}
module.exports = {generateMessage,generateLocationMessage};