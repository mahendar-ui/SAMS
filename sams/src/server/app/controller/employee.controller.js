const db = require('../config/db.config.js');
const Employee = db.employees;
const jwt = require('jsonwebtoken');
// Post a Customer
exports.create = (req, res) => {	
	// Save to MySQL database
	let employees = req.body;
	console.log(employees);
	Employee.create(employees).then(result => {		
		// Send created customer to client
		res.json(result);
	});
};