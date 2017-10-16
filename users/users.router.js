const express = require('express');
const controller = require('./users.controller.js');

const router = express.Router();

router.post('/users', (req, res) => {
  controller.insertData(req, (err, result) => {
    console.log(err);
    if (err) {
      res.status('500').send('cannot post to favourites'+'\n'+err);
    } else { res.send(req.body); }
  });
});
router.get('/users/:id', (req, res) => {
  controller.sendDataById(req, (err, result) => {
    if (err) {
      res.status('500').send('cannot get to favourites');
      c
    } else { 
      console.log(result);
      res.json(result); }
  });
});
module.exports = router;
