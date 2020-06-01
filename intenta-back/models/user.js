import {admin} from '../database/firesbase';
// Hash Contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;
// Filter fields
const _ = require('underscore');
const fields = ['name', 'email', 'role', 'password', 'active'];

export default ()=>{
    return {
        getUser(u){
            if(u === undefined) return {};
            return {
                name: u.name,
                email: u.email,
                role: u.role ?? 'USER_ROLE',
                password: u.password != null ? bcrypt.hashSync(u.password, saltRounds) : null,
                active:  !(u.active === false || u.active === 'false' || u.active === 0 || u.active === "0"),
                created: u.created === undefined ? admin.firestore.FieldValue.serverTimestamp() : u.created
            };
        },
        getDBuser(id, user){
            var _user = {};
            _user[id] = this.deleteSensibleData(user);
            return _user;
        },
        updateduser(_user, user){
            for (let prop in _.pick(user, fields)){
                if(prop){
                    _user[prop] = prop == 'password' ? this.getUser(user)[prop] : user[prop];
                }
            }
            return _user;
        },
        deleteSensibleData(user){
            delete user.created;
            delete user.password;
            return user;
        }
    };
};