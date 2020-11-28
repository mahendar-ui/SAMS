const db = require('../config/db.config.js');
const User = db.users;
const jwt = require('jsonwebtoken');
var winston = require('../config/winston');
var bcrypt = require('bcryptjs');
const saltRounds = 10;
const models = require('../model/user.model');
// Post a User
exports.create = (req, res) => {	
	// Save to MySQL database
	bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
		let user = {
			username:req.body.username,
			password:hash,
			email:req.body.email,
			fullname:req.body.fullname,
			stakeholder:req.body.stakeholder,
			stakeholder_bank:req.body.stakeholder_bank,
			stakeholder_university:req.body.stakeholder_university
		};
		console.log(user);
		let uniqueValidation;
		let response = {
			errorCode : 404,
			message : ''
		}
		// console.log(user);
		if(user.username){
			User.findOne({ where: { 'username': user.username } }).then(userRes => {
				if(userRes){
					uniqueValidation = true;
					response.message = 'Username already exist. Please choose another one.';
					res.json(response);
				}else{
					if(user.email){
						User.findOne({ where: { 'email': user.email } }).then(userRes => {
							console.log(userRes);
							if(userRes){
								uniqueValidation = true;
								response.message = 'Email already exist. Please choose another one.';
								res.json(response);
							}else{
								User.create(user).then(result => {	
									// Send created user to client
									res.json(result);
								}).catch (function(err) {
								//	console.log(JSON.stringify(err, null, 2));
							})
							}
						})
					}
					
				}
			})
		}
	    
   });
};
// Fetch all Users
exports.findAll = (req, res) => {
	User.findAll({
		model: models.User,
		attributes: {
		  exclude: ['password'] // Removing password from User response data
		},
		attributes: ['id', ['username', 'username'],['fullname', 'fullname'],
		['email','email']],
		order: [
            ['id', 'DESC'],
        ],
	  }).then(users => {
	  // Send all users to Client
	  res.json(users);
	});
};

// Find a User by Id
exports.findByPk = (req, res) => {	
	User.findByPk(req.params.userId).then(user => {
		res.json(user);
	}).catch(function(err) {
		console.log(err);
	})
};
 
// Update a User
exports.update = (req, res) => {
	let user = req.body;
	let id = req.body.id;
	bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
	let user = {
		user_name:req.body.username,
		user_password:hash,
		user_email:req.body.email,
		roles:req.body.role,
		full_name:req.body.fullname,
		phone_number:req.body.phonenumber,
	};
	User.update(user, 
		{ where: {id: id} }
	).then(() => {
			res.status(200).json({msg:"updated successfully a customer with id = " + id});
	});
	});	
};
 
// Delete a User by Id
exports.delete = (req, res) => {
	const id = req.params.userId;
	User.destroy({
		where: { id: id }
	}).then(() => {
		res.status(200).json({ msg: 'deleted successfully a user with id = ' + id });
	});
};
// password update
exports.passwordupdate = (req, res) => {
	let id = req.body.id;
	bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
	let user = {
		password:hash,
	};	
	User.update(user, 
		{ where: {id: id} }
	).then(() => {
			res.status(200).json({msg:"updated successfully a profile with id = " + id});
	});
	});	
};
// profile update
exports.profileupdate = (req, res) => {
	let id = req.body.id;
	let user = {
		fullname:req.body.fullname,
		phone_number:req.body.phone_number,
		stakeholder:req.body.stakeholder,
		stakeholder_bank:req.body.stakeholder_bank,
		stakeholder_university:req.body.stakeholder_university
	};
	User.update(user, 
		{ where: {id: id} }
	).then(() => {
			res.status(200).json({msg:"updated successfully a profile with id = " + id});
	});
};