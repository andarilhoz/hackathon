'use strict'
const User = require('../models/user'),
      bcrypt = require('bcryptjs'),
      passport = require('passport'),
      conta    = require('./contas')

class UserService{

     createUser(fields,res,req,error_str){
        let user = new User(fields)
        user.hash =  bcrypt.hashSync(fields.password, 10);
        return User.register(user,fields.password,(err,account) => {
            if ( err && err.code === 11000  || err && err.name == 'UserExistsError' || err && err.name == "ValidationError") { 
                console.log(err)
                error_str.push({code: 3, message:'User with username/email already Exists'});
                res.status(409).send({errors: error_str});
                return;
            }else if(err){
                res.status(500).send(err);
                return;
            }else{
                passport.authenticate('local')(req,res, () => {
                    req.session.save((err) => {
                        if(err) {
                            console.log(err);
                            return next(err);
                        }else{
                           res.locals  = {};
                           res.locals["success"]='Registration Success';
                           res.status(201).send(account._id);
                           conta.getEletropauloData(fields.inscricao,fields.cpf).then(x =>{
                                x.map((obj)=>{account.contas.push(obj)});
                                account.save();
                           })
			   .catch((err) => {
			   	console.log("Erro ao buscar contas na eletropaulo")
			   })
                        }
                    });
                });
            }
        });
    }

    fetchAllContas(usersWithout){
	usersWithout.forEach(user =>{
	  User.findById(user._id,(err,userFinal)=>{
   	    conta.getEletropauloData(userFinal.inscricao,userFinal.cpf).then(x =>{
		    x.map((obj)=>{userFinal.contas.push(obj)});
		    userFinal.save();
		    console.log(`Usuario: ${userFinal.username} atualizado`)
          	}).catch((err)=>{
			console.log('deu ruim' + err)
			userFinal.remove().exec()
		})
	  })
	})
    }

    findAllUsers(){
        return User.find()
    }

    findOneUserByName(name){
        return User.findOne({username: name})
    }

    findManyUserByName(name){
        return User.find({username: name})
    }

    findById(id){
        return User.findOne({_id: id})
    }

    updateUser(id,userData){
        return User.findByIdAndUpdate(id, userData, {new: true})
    }

}

module.exports = new UserService
