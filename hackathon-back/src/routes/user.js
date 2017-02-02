'use strict';
const express    = require('express'),
      router     = express.Router(),
      bodyParser = require('body-parser'),
      users      = require('../services/user.js');

router.use(bodyParser.json());

router.get('/:id', (req,res) => {
    users.findById(req.params.id).lean().exec((err,user)=>{
            if(user == undefined){
                res.sendStatus(404);
            }else{
                res.send(JSON.stringify(user));
            }
        });
});

router.get('/:id/image', (req,res) => {
    users.findById(req.params.id)
        .then(user => {
            res.send(user.imageUrl());
        });
});

router.get('/', (req,res) => {
    if(Object.keys(req.query).length === 0){
         users.findAllUsers().lean().exec((err,user)=>{
           res.send(JSON.stringify(user));
        });
    }
    else if(req.query.username && req.query.username.length > 0){
        users.findManyUserByName(new RegExp(req.query.username)).lean().exec((err,user)=>{
            res.send(JSON.stringify(user));
        });
    }else{
        res.sendStatus(404);
    }
});


router.post('/',(req,res) =>{
	let data = req.body;
	req.checkBody("email", "Enter a valid email address.").isEmail();
	let error_str = [];
    let errors = req.validationErrors();

    if(data.confirmPassword != data.password){
        error_str.push({code: 1, message: 'Password and Confirm Password doesnt match'});
    }
    if (data.email != data.confirmEmail){
        error_str.push({code: 2, messae: 'Email and Confirm email doesnt match'});
    }
    if (errors || error_str.length) {
        for (let i = 0; i < errors.length; i++){
            error_str.push(errors[i].msg);
        }
        res.status(400).send({errors:error_str});
    }else{
        delete data.confirm_email;
        delete data.confirm_password;
        users.createUser(data,res,req,error_str);
    }
});

router.patch('/:id',(req,res) => {
    users.updateUser(req.params.id,req.body).lean().exec((err,user)=>{
            res.send(JSON.stringify(user));
        });
});

module.exports = router;