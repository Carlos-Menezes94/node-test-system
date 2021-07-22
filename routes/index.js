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

/* Rota de cadastro de nome/email */
router.get('/add', function(req, res) {
  res.render('form');
});


/* Rota de recebimento de dados de nome/email */
router.post('/add', function(req, res) {
  db.query('INSERT INTO emailcadastrados(nome, email) VALUES (?,?)', [req.body.nome, req.body.email], function(erro){
    if(erro){
      res.status(200).send('Erro: ' + erro)
    }
    res.redirect('/listar')
  })
});

module.exports = router;
