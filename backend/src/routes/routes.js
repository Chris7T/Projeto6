const UserController = require('../controllers/UsersControllers'); //Exportando o Controller de Usuario 
const express = require('express');//Exportando o Express para criação das rotas
const passport = require('passport');//Exportando o Passport para utilização do OAuth
const cookieSession = require('cookie-session');//Exportando o Cookie Session para guardar os dados da sessão
require('../../passport-setup'); //Importando o arquivo com as configurações do passaport
const cors = require('cors')  //Permitir que as rotas sejam acessadas por endereço diferente
const routes = express()

routes.use(cors())

//GOOGLE ROUTES

//Guardando os dados da Sessão;
routes.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

//Instanciando o objeto da classe de Controller de Usuario 
var users = new UserController();
//Inicializando o processo de autentificação 
routes.use(passport.initialize());
routes.use(passport.session());

//Verificar se o usuario está logado
const isLoggedIn = (req, res, next) => {
    //Se existier "USER", ele estão logado
    if (req.user) {
        next();
    }
    //Se não existir, retornarar erro 401
    else {
        res.sendStatus(401);
    }
}
//Rota para não log pelo google
routes.get('/', (req, res) => res.json("Nao Logado"));

//Rota para login bem sucedido
routes.get('/good', isLoggedIn, (req, res) => res.json(req.user));
//routes.get('/good', isLoggedIn ,(req,res) =>res.send(`Logado ${req.user.displayName}!`) ); 

//Rota para efetuar o login via Google
routes.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

//Rota de Retorno
routes.get('/google/callback', passport.authenticate('google', { successRedirect: '/show', failureRedirect: '/login' }));
//Rota para deslogar o usuario  
routes.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
})
//Rota para visualizar usuario
routes.get('/show', isLoggedIn, (req, res) => { res.json(req.user._json); })
//FACEBOOK ROUTES

//Rota para efetuar o login via Facebook
routes.get('/facebook', passport.authenticate('facebook'));

//Rota de Retorno 
routes.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/show', failureRedirect: '/login' }));

//APP ROUTES
    
//Rota de verificar USUARIO
routes.post('/login', users.login);

//Rota de registrar USUARIO
routes.post('/register', users.register);

//Rota de listar USUARIOS
routes.get('/list', users.list);

//Rota de update USUARIOS
routes.patch('/update', users.update);

//Exportando as rotas
module.exports = routes;