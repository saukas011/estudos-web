const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send('tudo certo por aqui');
});

app.get('/about', function(req, res){
    res.send('Sobre nós');
});

app.get('/ola-nome/:nome', function(req, res){
    res.send("<h1>ola " + req.params.nome + "!<h1>" + "<h2>so se pode chamar a funcao send uma vez por get<h2>");
});

app.listen(3000, function() {
    console.log('servidor rodando! acesse: http://localhost:3000');
});