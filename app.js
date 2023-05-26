const express = require('express'); //Declarando a dependência do app "express"
const morgan = require('morgan'); //Declarando a dependência do app "morgan"
const mongoose = require('mongoose');  //Declarando a dependência do app "mongoose"
const Blog = require('./models/comanda', './models/funcionario', './models/estoque'); //Apontando os bancos de dados utilizados para a aplicação
const cors = require('cors')
const ComandaListRoutes = require('./routes/api/comanda');
const EstoqueListRoutes = require('./routes/api/estoque');
const FuncionarioListRoutes = require('./routes/api/funcionario');
const bodyParser = require('body-parser');
const app = express(); //Utilizando o app "express"
const database = require("./sqlite");
(async () => {
try {
  const resultado = await database.sync();
  console.log(resultado);
} catch (error) {
  console.log(error);
}

})();
const dbURI = 'mongodb+srv://admin:admin@teko.gqpmipd.mongodb.net/TekoDB'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) //Conexão e inicialização do banco de dados na aplicação
  .then(result => app.listen(4000)) //Especificando a porta na qual o endereço da aplicação será utilizada
  .catch(err => console.log(err)); //Instruindo a aplicação para escrever erros na tela, caso ocorram


app.set('view engine', 'ejs'); //Utilizando o app "ejs"
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public')); //Declarando a pasta "public" como fonte de arquivos estáticos
app.use(express.urlencoded({ extended: true })); //Utilizando a função de rotas do express
app.use(morgan('dev'));  //Utilizando o app "morgan"
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// rotas
app.use('/api/comandaList', ComandaListRoutes)
app.use('/api/funcionarioList,', FuncionarioListRoutes)
app.use('/api/estoqueList', EstoqueListRoutes)

app.get('/comandas/abrir', (req, res) => {
  res.render('create', { title: 'Abrir uma nova comanda' });
});

app.get('/func/func', (req, res) => {
  res.render('registrofunc', { title: 'Registrar Funcionário' });
});


app.get('/func/login', (req, res) => {
  res.render('loginfunc', { title: 'Login para Funcionários' });
});



app.post('/func/func', (req, res) => {
  const func = new func(req.body);

  func.save()
    .then(result => {
      res.redirect('/func/login');
    })
    .catch(err => {
      console.log(err);
    });
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

module.exports = app;