
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: 3306,
    database: 'testsystem',
    multipleStatements: true
});

//Conexão com database
db.connect((erro) => {
    if(erro){
        throw erro;
    }
 
    console.log(`Conectado`)
});

global.db = db;

module.exports = db;