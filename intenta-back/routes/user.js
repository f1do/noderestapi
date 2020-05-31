import express from 'express';
const router = express.Router();
const collection = 'users';

import {db} from '../database/firesbase';
import user from '../models/user';
import {AuthPetition, ManagementRoles} from '../middlewares/authentication'

router.post('/new-user', async (req, res) => {
  var body = user(req.body).getUser;
  //const userRef = db.collection(collection);

  try {
    var _user = await db.collection(collection).where('email', '==', body.email).get();
    if(_user.empty){
        await db.collection(collection).doc(req.body.uid).set(body, e => {
          if(!e){ 
            body = user(body).getDBuser(ref.key);
            res.json(body); 
          }
          else { return error(res, e, req.body, 500); }
        });
    }
    else{
      return error(res, 'El email ya ha sido registrado', req.body);
    }
  } catch (err) {
    return error(res, err, req.body);
  }
  
});

router.put('/user/:id', [AuthPetition, ManagementRoles], (req, res) => {

  const id = req.params.id;
  const ref = db.ref(`${collection}/${id}`);

  try {

    ref.once('value', data =>{
      if(!data.val()){
        return error(res, 'No se encontró el registro a actualizar', req.body); 
      }

      var body = user(req.body).updateduser(data.val());

      ref.set(body, (e) => { 
        if(!e){ 
          body = user(body).getDBuser(ref.key);
          res.json(body); 
        }
        else{ 
          body = user(req.body).deleteSensibleData();
          return error(res, e, body); 
        }
      });
    });

  } catch (error) {
    error(res, error, req.body, 500);
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

// r=response | e=Error | b=Body | s=Status
const error = (r,e,b,s) => {
  return r.status(s ?? 400).json({
      mensaje: 'Error',
      error: e,
      request: b
    }
  );
};
// data=Object returned | res=Response | boj.msg=Message | obj.id=Request | obj.callback
const onceData = (data, res, obj) => {
  if(!data){
      return error(res, obj.msg, obj.id);
  }
  
  if(obj.callback) return res.status(200).json(obj.callback());
  else return res.status(200).json(data);
};
  
module.exports = router;