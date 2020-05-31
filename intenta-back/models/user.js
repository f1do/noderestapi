import {admin} from '../database/firesbase';
// Hash Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;
// Filter fields
const _ = require('underscore');
const fields = ['name', 'email', 'role', 'password', 'active'];

export default (n)=>{
    return {
        getUser:{
            name: n.name,
            email: n.email,
            role: n.role,
            password: n.password != null ? bcrypt.hashSync(n.password, saltRounds) : null,
            active: n.active != null && 
                    (n.active === true || n.active === 'true' || n.active === 1 || n.active === "1"),
            created: admin.database.ServerValue.TIMESTAMP
        },
        getDBuser(id){
            var user = {};
            user[id] = this.deleteSensibleData();
            return user;
        },
        updateduser(_user){
            for (let prop in _.pick(n, fields)){
                if(prop){
                    _user[prop] = prop == 'password' ? this.getUser[prop] : n[prop];
                }
            }
            return _user;
        },
        deleteSensibleData(){
            delete this.getUser.created;
            delete this.getUser.password;
            return this.getUser;
        }
    };
};