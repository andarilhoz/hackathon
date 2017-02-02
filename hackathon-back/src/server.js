'use strict'
const express  = require('express'),
      app      = express(),
      usuarios = require('./routes/user'),
      bodyParser   = require('body-parser'),
      passport     = require('passport'),
      cookieParser = require('cookie-parser'),
      LocalStrategy = require('passport-local').Strategy,
      flash = require('connect-flash'),
      validator    = require('express-validator')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(validator())

app.use(cookieParser())
app.use(require('express-session')({
    secret: 'BODY BUILDER PORRA',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(flash())
app.use(passport.session())

const Account = require('./models/user.js')
passport.use(new LocalStrategy(Account.authenticate()))
passport.serializeUser(Account.serializeUser())
passport.deserializeUser(Account.deserializeUser())




app.use('/usuario',usuarios)

module.exports = app


