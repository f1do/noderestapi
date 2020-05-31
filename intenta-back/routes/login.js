import express from 'express';
const router = express.Router();
const collection = 'users';

const bcrypt = require('bcrypt');
const saltRounds = 10;

import {db} from '../database/firesbase';
import user from '../models/user';

router.post('/', (req, res) => {
  var body = req.body;

  db.ref(collection).orderByChild('email').equalTo(body.email).once("value", data => {
    if (data.exists()) {
        if( !bcrypt.compareSync(body.password, data.val()[Object.keys(data.val())].password) ){
            return error(res, 'La combinación email/password no es reconocida en el sistema.', req.body);
        }

        res.json({
            message: user(data.val()[Object.keys(data.val())]).getDBuser(Object.keys(data.val())),
            token: 'NAAAA'
        }); 

    } else {
        return error(res, 'La combinación email/password no es reconocida en el sistema.', req.body);
    }
  });
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