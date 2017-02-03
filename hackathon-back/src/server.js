'use strict'
const express       = require('express'),
      app           = express(),
      usuarios      = require('./routes/user'),
      login         = require('./routes/login'),
      logout        = require('./routes/logout'),
      me            = require('./routes/me'),
      bodyParser    = require('body-parser'),
      passport      = require('passport'),
      cookieParser  = require('cookie-parser'),
      LocalStrategy = require('passport-local').Strategy,
      flash         = require('connect-flash'),
      validator     = require('express-validator')

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

app.use('/api/usuario',usuarios)
app.use('/api/login',login)
app.use('/api/logout',logout)
app.use('/api/me',me)

module.exports = app


