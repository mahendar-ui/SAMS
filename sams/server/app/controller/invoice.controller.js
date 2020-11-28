const db = require('../config/db.config.js');
const Invoice = db.invoices;
const jwt = require('jsonwebtoken');
const { invoices } = require('../config/db.config.js');
// Post a Customer
exports.create = (req, res) => {	
	// Save to MySQL database
	let invoices = req.body;
	console.log(invoices);
	Invoice.create(invoices).then(result => {		
		// Send created customer to client
		res.json(result);
	});
};

// Fetch all Clients
exports.findAll = (req, res) => {
	Invoice.findAll().then(invoices => {
	  // Send all customers to Client
	  res.json(invoices);
	});
};

// Find a Invoice by Id
exports.findByPk = (req, res) => {	
	Invoice.findByPk(req.params.invoiceId).then(invoices => {
		res.json(invoices);
	})
};
