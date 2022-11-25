/*
import { appendFileSync } from 'fs';


function createUserObject (body){
    const name = body.name;
    const email = body.mail;
    const password = body.pass;
    let user = new User(1,name, email, password);
    console.log("user in create: " + user);
    addUser(user,  (err)=>{console.log(err);});

class User {
    constructor(id=1,name,email, password,loginDate= new Date(), suspensionDate=null, suspensionTime="0", status="inactive") {
        this.name = name;
        this.email = email;
        this.loginDate = loginDate;
        this.password = password;
        this.suspensionDate = suspensionDate;
        this.suspensionTime = suspensionTime;
        this.status = status;
        this.id=id;
    }
   toCSVRow() {
       const new_user = `${this.id},${this.name},${this.email},${this.password},${this.loginDate},${this.suspensionDate},${this.suspensionTime},${this.status}\n`;
       try {
           appendFileSync('./test.csv', new_user);
       } catch (err) {
           console.error(err);
   }

}

module.exports = User;*/
