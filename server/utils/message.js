const moment = require('moment')

const generateMessage = (from,text)=>{
    return{
        from,
        text,
        createdAt:moment().format('H:mm')
    }
}

const generateLocationMessage = (from,latitude,longitude)=>{
    return{
        from,
        text:`<a href="https://www.google.com/maps?${latitude},${longitude}" target="_blank">My location</a>`,
        createdAt:moment().format('H:mm')
    }
}
module.exports = {generateMessage,generateLocationMessage};