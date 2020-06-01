import express from 'express';
const router = express.Router();
const collection = 'users';

import {db} from '../database/firesbase';
import user from '../models/user';
import {AuthPetition, ManageRoles} from '../middlewares/authentication';
import {error, returnResult} from './response';

router.post('/new-user', async (req, res) => {
  var body = user().getUser(req.body);
  const userRef = db.collection(collection);

  try {
    var _email = await userRef.where('email', '==', body.email).get();
    var _uid = await userRef.doc(req.body.uid).get();
    if(_email.empty && !_uid.exists){
      await userRef.doc(req.body.uid).set(body);
      returnResult(body, res, {uid:req.body.uid});
    }
    else{
      return error(res, 'El email o id ya está registrado', req.body);
    }
  } catch (err) {
    return error(res, err, req.body);
  }
  
});

router.get('/user/:id', AuthPetition, async (req, res) => {
  const id = req.params.id;
  const userRef = db.collection(collection);

  try {
    var _uid = await userRef.doc(id).get();
    if(_uid.exists){
      returnResult(_uid.data(), res, {uid:id});
    }
    else{
      return error(res, 'No se encontró al usuario solicitado.', req.body);
    }
  } catch (err) {
    return error(res, err, req.body);
  }
});

router.put('/user/:id', [AuthPetition, ManageRoles], async (req, res) => {

  const id = req.params.id;
  const refUsuario = db.collection(collection).doc(id);

  try {
    const usuario = await refUsuario.get();
    if(usuario.exists){
      var body = user().updateduser(usuario.data(), req.body);
      await refUsuario.update(body);
      returnResult(body, res, {uid:id});
    }
    else{
      error(res, 'No se encontró el registro a actualizar', req.body); 
    }
  } catch (err) {
    error(res, err, req.body, 500);
  }
});

router.delete('/user/:id', (req, res) => {

  let id = req.params.id;

  try {

    const ref = db.ref(`${collection}/${id}`);
    ref.once("value", d=> 
      onceData(d, res, { msg: 'No se encontró el id indicado', id,
        callback: ()=>{
          ref.remove();
          return note(d.val()).deleteSensibleData();
        }
      })
    );
    
  } catch (error) {
    error(res, error, data);
  }

});
  
module.exports = router;