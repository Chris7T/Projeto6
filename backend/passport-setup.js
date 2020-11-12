const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const dotenv = require('dotenv').config();//Importando Variaveis de Ambiente

//GOOGLE SETUP

//Seriealize e Deserialize são usados em Authenticator
//Serialize serve para verificar quais dados serão armazenados no cookie
passport.serializeUser(function (user, done) {
    done(null, user);
});
//Deserialize serve para encontrar todos os dados através do dado armazenado pelo cookie
passport.deserializeUser(function (user, done) {
    done(null, user);
});
//Dados do Google Credenciais
passport.use(new GoogleStrategy({
    clientID: process.env.Google_ClientID,
    clientSecret: process.env.Google_ClientSecret,
    callbackURL: process.env.Google_CallbackURL
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }

));

//FACEBOOK SETUP

//Dados do Facebook Credenciais 
passport.use(new FacebookStrategy({
    clientID: process.env.Facebook_ClientID,
    clientSecret: process.env.Facebook_ClientSecret,
    callbackURL: process.env.Facebook_CallbackURL
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
))