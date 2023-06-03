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
// (async () => {
// try {
//   const resultado = await database.sync();
//   console.log(resultado);
// } catch (error) {
//   console.log(error);
// }

// })();
// app.listen(4000);


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
app.use('/api/funcList,', FuncionarioListRoutes)
app.use('/api/estoqueList', EstoqueListRoutes)


module.exports = app;