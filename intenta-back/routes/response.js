import { response } from 'express';
import user from '../models/user';

// r=response | e=Error | b=Body | s=Status
const error = (r,e,b,s) => {
    return r.status(s ?? 400).json({
        result: 'Error',
        error: e,
        request: b
      }
    );
  };
  // data=Object returned | res=Response | boj.msg=Message | obj.id=Request | obj.callback
  const returnResult = (data, res, obj) => {
    if(obj.callback) return res.status(200).json(obj.callback());
    else {
        var body = user().getDBuser(obj.uid, data);
        return res.status(200).json({
            result: "Success",
            message: body
        });
    }
  };

  module.exports = {error, returnResult};