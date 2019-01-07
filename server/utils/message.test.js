const expect = require('expect');

const {generateMessage,generateLocationMessage} = require('./message');

describe('Generating messages',()=>{
    it('should return a message',()=>{
        let message = {
            from:'petya',
            text:'with love'
        }
        let res = generateMessage(message.from,message.text)
        expect(res.from).toBe(message.from);
        expect(typeof res.createdAt).toBe('number');
    })
    it('should return a html template of the google maps geolocation',()=>{
        let message = {
            from:'Admin',
            latitude:1,
            longitude:1
        }
        let res = generateLocationMessage(message.from,message.latitude,message.longitude)
        expect(res.from).toBe(message.from);
        expect(typeof res.createdAt).toBe('number');
        expect(typeof res.text).toBe('string');
    })
})