const db = require('../config/db.config.js');
const Employee = db.employees;
const jwt = require('jsonwebtoken');
// Post a employee
exports.create = (req, res) => {	
	// Save to MySQL database
	let employees = req.body;
	console.log(employees);
	Employee.create(employees).then(result => {		
		// Send created employee
		res.json(result);
	});
};

// Fetch all employees
exports.findAll = (req, res) => {
	Employee.findAll({attributes: {
		exclude: ['password'] // Removing password from User response data
	  },order: [
		['id', 'DESC'],
	],
     }).then(employees => {
	  // Send all customers to employee
	  res.json(employees);
	});
};

// Find a Employee by Id
exports.findByPk = (req, res) => {	
	Employee.findByPk(req.params.employeeId,
		{attributes: {
		exclude: ['password'] // Removing password from User response data
	  },}).then(employees => {
		res.json(employees);
	})
};

//  Update a employee
exports.update = (req, res) => {
	let employee = req.body;
	let id = req.body.id;
	Employee.update(employee, 
					 { where: {id: id} }
				   ).then(() => {
						 res.status(200).json({msg:"updated successfully employee with id = " + id});
				   });	
};

// Delete a employee by Id
exports.delete = (req, res) => {
	const id = req.params.employeeId;
	Employee.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).json({msg:'Employee deleted successfully id = ' + id});
	});
};
 