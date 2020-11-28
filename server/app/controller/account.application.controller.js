const db = require('../config/db.config.js');
const Account = db.account_applications;
const jwt = require('jsonwebtoken');
var winston = require('../config/winston');
var bcrypt = require('bcryptjs');
const saltRounds = 10;
const models = require('../model/account.model');
// Post a User
exports.create = (req, res) => {	
	// Save to MySQL database

		let account = {
			firstname:req.body.firstname,
			lastname:req.body.lastname,
			student_email:req.body.student_email,
			student_id:req.body.student_id,
			phone_number:req.body.phone_number,
			university:req.body.university,
			bank:req.body.bank,
			address:req.body.address,
			city:req.body.city,
			postcode:req.body.postcode,
			course:req.body.course,
			user_id:req.body.user_id,
			message:req.body.message,
			account_passport:req.body.passport,
			brp_number:req.body.brpnumber
		};
		let uniqueValidation;
		let response = {
			errorCode : 404,
			message : ''
		}
		// console.log(user);
		Account.create(account).then(result => {	
			// Send created user to client
			res.json(result);
		}).catch (function(err) {
		//	console.log(JSON.stringify(err, null, 2));
	})

};
// Fetch all Users
exports.findAll = (req, res) => {
	console.log(req.body)
	if(req.body.stakeholder === 'US'){
		Account.findAll({where:{'user_id':req.body.userId} }).then(accounts => {
			// Send all users to Client
			res.json(accounts);
		  });
	}else if(req.body.stakeholder === 'BOS'){
		Account.findAll({where:{'bank':req.body.stakeholderValue} }).then(accounts => {
			// Send all users to Client
			res.json(accounts);
		  });
	}
	else{
		Account.findAll({where:{'university':req.body.stakeholderValue} }).then(accounts => {
			// Send all users to Client
			res.json(accounts);
		  });
	}
};

// Find a User by Id
exports.findByPk = (req, res) => {	
	Account.findOne({where:{'user_id':req.params.accountId}}).then(account => {
		res.json(account);
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
	Account.update(user, 
		{ where: {id: id} }
	).then(() => {
			res.status(200).json({msg:"updated successfully a customer with id = " + id});
	});
	});	
};
 
// Delete a User by Id
exports.delete = (req, res) => {
	const id = req.params.userId;
	Account.destroy({
		where: { id: id }
	}).then(() => {
		res.status(200).json({ msg: 'deleted successfully a user with id = ' + id });
	});
};

//update bank request
exports.updateBankRequest = (req,res) => {
	let account = {
		status : 'requested'
	}
	Account.update(account, 
		{ where: {Id: req.body.id} }
	).then(() => {
			res.status(200).json({msg:"Request sent successfully", result:req.body });
	});
}
exports.rejectApplication = (req,res) => {
	let account = {
		status : 'rejected',
		bos_message:req.body.bos_message,
		uad_message:req.body.uad_message
	}
	Account.update(account, 
		{ where: {Id: req.body.id} }
	).then(() => {
			res.status(200).json({msg:"Application Rejected", result:req.body });
	});
}
exports.approveApplication = (req,res) => {
	let account = {
		status : 'approved'
	}
	Account.update(account, 
		{ where: {Id: req.body.id} }
	).then(() => {
			res.status(200).json({msg:"Application Approved", result:req.body });
	});
}