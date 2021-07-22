var express = require('express');
var router = express.Router();
var db = require('../util/db')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});



/* Listagem de email armazenada no database */
router.get('/listar', function(req, res) {
  db.query('SELECT * FROM emailcadastrados ORDER BY nome',[],function(erro,resultado){
    if(erro){
      res.status(200).send(erro)
    }
    res.render('lista', { lista : resultado})
  })
})

module.exports = router;
