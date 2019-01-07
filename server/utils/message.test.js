const expect = require('expect');

const {generateMessage} = require('./message');

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
})