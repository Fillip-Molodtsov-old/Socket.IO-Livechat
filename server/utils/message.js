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
        text:'My location',
        createdAt:moment().format('H:mm'),
        link:`https://www.google.com/maps?${latitude},${longitude}`,
    }
}
module.exports = {generateMessage,generateLocationMessage};