import express from 'express';
const router = express.Router();
const collection = 'notes';

// importar el modelo nota
import {db} from '../database/firesbase';
import note from '../models/note';

// Add note
router.post('/new-note', (req, res) => {
  var body = note(req.body).getNote;
  const ref = db.ref(collection).push();

  ref.set(body, (e) => {
    if(!e){ 
      body = note(body).getDBnote(ref.key);
      res.json(body); 
    }
    else{ return error(res, e, body, 500); }
  });
});

// Get con parámetros
router.get('/note/:id', async(req, res) => {
  const id = req.params.id;

  try {
    const ref = db.ref(`${collection}/${id}`);
    
    ref.once("value", d=>
      onceData(d, res, { msg: 'No se encontró el id indicado', id,
        callback: ()=> note(d.val()).deleteSensibleData()})
    );
        
  } catch (error) { error(res, error); }
});

// Get con todos los documentos
router.get('/notes', async (req, res) => {
  try {
    const ref = db.ref(collection);
    ref.once("value", d=> 
        onceData(d, res, { msg: 'No se encontró información', id: ''}) );
  } catch (error) {
    error(res, error);
  }
});

// Delete eliminar una nota
router.delete('/note/:id', async(req, res) => {
  const id = req.params.id;
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

// Put actualizar una nota
router.put('/note/:id', async (req, res) => {
  const id = req.params.id;
  const ref = db.ref(`${collection}/${id}`);

  try{
    ref.once('value', async data =>{
      if(!data.val()){
        return error(res, 'No se encontró el registro a actualizar', req.body); 
      }

      var body = note(req.body).updatednote(data.val());

      ref.set(body, (e) => { 
        if(!e){ 
          body = note(body).getDBnote(ref.key);
          res.json(body); 
        }
        else{ 
          body = note(req.body).deleteSensibleData();
          return error(res, e, body); 
        }
      });
    });
  }
  catch(err){
    error(res, err, req.body, 500);
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
  if(!data.val()){
      return error(res, obj.msg, obj.id);
  }
  
  if(obj.callback) return res.status(200).json(obj.callback());
  else return res.status(200).json(data);
};

// Exportamos la configuración de express app
module.exports = router;