import {admin, db} from '../database/firesbase';
import { response } from 'express';

const AuthPetition =(req,res,next)=>{
    const token = req.get('token');

    admin.auth().verifyIdToken(token ?? '')
    .then(function(decodedToken) {
        //let uid = decodedToken.uid;
        req.user = decodedToken;
        next();
    }).catch(function(error) {
        return res.status(401).json({
            mensaje: 'Usuario no válido',
            error: error
          }
        );
    });

};

const ManageRoles = async (req, res, next)=>{
    var email = req.user.email;
    const ref = db.collection('users');
    var usr = await ref.where('email', '==', email).get();
    
    if(usr.empty)
    {
        return res.status(401).json({
            mensaje: 'Usuario no válido',
            }
        );
    } 
    
    usr.forEach(doc => {
        if(doc.data().role === 'ADMIN')
            next();
      });
};

module.exports = {AuthPetition, ManageRoles}