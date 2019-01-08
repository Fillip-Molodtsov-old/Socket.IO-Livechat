class Users{
    constructor(){
        this.users = [];
    }
    addUser(id,name,room){
        let user = {id,name,room};
        this.users.push(user);
        return this.user;
    }
    removeUser(id){
       let user = this.getUser(id);
       if(user){
        // let index = this.user.indexOf(user);
        // return this.users.splice(index,1);
        this.users = this.users.filter(user=>user.id!==id);
       }
       return user;
    }
    getUser(id){
       return this.users.filter(user=>user.id===id)[0];
    }
    getUserList(room){
        let users = this.users.filter(user=>user.room===room);
        let namesArray = users.map(user=>user.name)
        return namesArray;
    }
}

module.exports = {Users};