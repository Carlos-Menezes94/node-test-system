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
  res.render('form', {usuario : {}});
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

/* Rota para buscar para edição */
router.get('/edit/:id', function(req, res) {
  db.query('SELECT * FROM emailcadastrados WHERE id = ?', [req.params.id], function(erro, resultado){
    if(erro){
      res.status(200).send('Erro: ' + erro) 
    }
    //res.status(200)
    res.render('form', {usuario : resultado[0]})
  })
});

/* Rota para receber dados para edição */
router.post('/edit/:id', function(req, res) {
  db.query('UPDATE emailcadastrados SET nome = ?, email = ? WHERE id = ?', [req.body.nome, req.body.email, req.params.id], function(erro){
    if(erro){
      res.status(200).send('Erro: ' + erro) 
    }
    //res.status(200)
    res.redirect('/listar')
  })
});


/* Rota para receber dados para exclusão  */
router.delete('/delete/:id', function(req, res) {
  db.query('DELETE FROM emailcadastrados WHERE id = ?', [req.params.id], function(erro){
    if(erro){
      res.status(200).json('Erro: ' + erro) 
    } else{
      res.status(200).send('OK');
    }
  
  })
});

module.exports = router;
