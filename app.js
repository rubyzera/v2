const express = require('express'); //Declarando a dependência do app "express"
const morgan = require('morgan'); //Declarando a dependência do app "morgan"
const mongoose = require('mongoose');  //Declarando a dependência do app "mongoose"
const Blog = require('./models/comandas', '/models/func'); //Apontando os bancos de dados utilizados para a aplicação
const cors = require('cors')
const ComandaListRoutes = require('./routes/api/comandas');
const bodyParser = require('body-parser');
const app = express(); //Utilizando o app "express"


// const dbURI = 'mongodb+srv://admin:admin@teko.gqpmipd.mongodb.net/?retryWrites=true&w=majority+srv://fabiocr6:mCMsUGFxZF1am2Ze@cluster0.urt2d8b.mongodb.net/node-test?retryWrites=true&w=majority'; //Autenticação com o banco de dados na nuvem
const dbURI = 'mongodb+srv://admin:admin@teko.gqpmipd.mongodb.net/TekoDB'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }) //Conexão e inicialização do banco de dados na aplicação
  .then(result => app.listen(3000)) //Especificando a porta na qual o endereço da aplicação será utilizada
  .catch(err => console.log(err)); //Instruindo a aplicação para escrever erros na tela, caso ocorram


app.set('view engine', 'ejs'); //Utilizando o app "ejs"
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); //Declarando a pasta "public" como fonte de arquivos estáticos
app.use(express.urlencoded({ extended: true })); //Utilizando a função de rotas do express
app.use(morgan('dev'));  //Utilizando o app "morgan"
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.use('/api/comandaList', ComandaListRoutes)


app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});


app.get('/comandas/abrir', (req, res) => {
  res.render('create', { title: 'Abrir uma nova comanda' });
});

app.get('/func/func', (req, res) => {
  res.render('registrofunc', { title: 'Registrar Funcionário' });
});

app.get('/blogs/registropessoasti', (req, res) => {
  res.render('registropessoasti', { title: 'Registrar pessoas que já trabalham com TI' });
});

app.get('/func/login', (req, res) => {
  res.render('loginfunc', { title: 'Login para Funcionários' });
});

app.get('/loginpessoasti', (req, res) => {
  res.render('loginpessoasti', { title: 'Login para profissionais' });
});

app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'Listagem de Comandas' });
    })
    .catch(err => {
      console.log(err);
    });
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

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});