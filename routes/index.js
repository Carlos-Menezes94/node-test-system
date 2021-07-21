var express = require('express');
var router = express.Router();
var db = require('../util/db')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Test-System', data : new Date() });
});

router.get('/mensagem', function(req, res) {
  res.render('mensagem', { mensagem: 'Voce acessou a rota mensagem' });
})

router.get('/mensagem2', function(req, res) {
  res.render('index', { title: 'Oi, voce acesou a rota view mensagem2' });
})

router.get('/listar', function(req, res) {
  db.query('SELECT * FROM emailcadastrados',[],function(erro,resultado){
    if(erro){
      res.status(200).send(erro)
    }
    res.render('lista', { lista : resultado})
  })
})

module.exports = router;
