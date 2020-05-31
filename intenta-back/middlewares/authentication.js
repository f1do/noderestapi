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

const ManagementRoles = (req, res, next)=>{
    var email = req.user.email;
    const ref = db.ref('users');
    ref.orderByChild('email').equalTo(email).once("value", data => {
        
        if (data.exists() && data.val() != null &&
            data.val()[Object.keys(data.val())].role === 'ADMIN') {
            next();
        } 
        else{
            return res.status(401).json({
                mensaje: 'Usuario no válido',
                }
            );
        }
    });
};

module.exports = {AuthPetition, ManagementRoles}