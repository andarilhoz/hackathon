'use strict'

const mongoose = require('mongoose'),
      db = require('./db'),
      passportLocalMongoose = require('passport-local-mongoose'),
      uniqueValidator = require('mongoose-unique-validator'),
      gravatar = require('gravatar')

const UserSchema = mongoose.Schema({
	username: {type: String, unique: true, dropDups: true, required: true},
	ultimoLogin: {type: Date, default: Date.now} ,
    entryDate: Date,
    email: {type: String, unique: true, dropDups: true, required: true},
    cpf: String,
    inscricao: String,
    ultimoGasto: String,
    contas: [{
        dataCadastro: {type: Date, default: Date.now} ,
        data: Date,
        valor: String,
        situacao: String
    }],
    pontuacao: String,
    hash:String
})



UserSchema.methods.imageUrl = function(){
    return gravatar.url(this.email, { s: '80', d: '/images/icons/userDefault.png'}, false);
}

UserSchema.plugin(uniqueValidator);
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('user', UserSchema)

module.exports = User 