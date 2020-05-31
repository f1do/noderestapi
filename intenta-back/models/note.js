import {admin} from '../database/firesbase';

export default (n)=>{
    return {
        getNote:{
            name: n.name,
            userId: n.userId,
            description: n.description,
            created: admin.database.ServerValue.TIMESTAMP,
            active: n.active != null && 
                    (n.active === true || n.active === 'true' || n.active === 1 || n.active === "1")
        },
        getDBnote(id){
            var note = {};
            note[id] = this.deleteSensibleData();
            return note;
        },
        updatednote(_note){
            for (let prop in n){
                if(prop){
                    _note[prop] = prop == 'active' ? this.getNote[prop] : n[prop];
                }
            }
            return _note;
        },
        deleteSensibleData(){
            delete this.getNote.created;
            return this.getNote;
        }
    };
};