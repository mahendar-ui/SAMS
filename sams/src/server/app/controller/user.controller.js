const db = require('../config/db.config.js');
const User = db.users;
const jwt = require('jsonwebtoken');
// Post a Customer
exports.create = (req, res) => {	
	// Save to MySQL database
	let user = req.body;
	User.create(user).then(result => {		
		// Send created customer to client
		res.json(result);
	});
};
// Fetch all Customers
exports.findAll = (req, res) => {
	User.findAll().then(users => {
	  // Send all customers to Client
	  res.json(users);
	});
};

// Find a Customer by Id
// exports.findById = (req, res) => {	
// 	User.findById(req.params.userId).then(user => {
// 		res.json(user);
// 	})
// };
 
// Update a Customer
exports.update = (req, res) => {
	let user = req.body;
	let id = req.body.id;
	User.update(user, 
					 { where: {id: id} }
				   ).then(() => {
						 res.status(200).json({msg:"updated successfully a customer with id = " + id});
				   });	
};
 
// Delete a Customer by Id
exports.delete = (req, res) => {
	const id = req.params.userId;
	User.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).json({msg:'deleted successfully a user with id = ' + id});
	});
};