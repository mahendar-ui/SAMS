const db = require('../config/db.config.js');
const Client = db.clients;
const jwt = require('jsonwebtoken');
const resMessages = require('../config/response.messages');
var winston = require('../config/winston');

// Post a Client / Create an new Client
exports.create = (req, res) => {
	try {
		// Save to MySQL database
		let clients = {
			client_firstname: req.body.clientFirstname,
			client_lastname: req.body.clientLastname,
			client_email: req.body.clientEmail,
			client_details: req.body.clientDetails,
			contact_name: req.body.contactname,
			contact_email: req.body.contactemail,
			contact_phone: req.body.contactphone,
			supervisor_firstname: req.body.supervisorFirstname,
			supervisor_lastname: req.body.supervisorLastname,
			supervisor_phonenumber: req.body.supervisorPhonenumber,
			supervisor_email: req.body.supervisorEmail,
			timesheet_firstname: req.body.timesheetFirstname,
			timesheet_email: req.body.timesheetEmail,
			timesheet_phonenumber: req.body.timesheetPhonenumber,
			user_id: req.body.user_id,
		};
		Client.create(clients).then(result => {
			// Send created customer to client
			res.json(result);
		});
	} catch (err) {
		var error = resMessages.errors;
		res.json({ errorCode: error.error_500.errorCode, errorMessage: error.error_500.errorMessage });
		winston.info(`${err.status} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
	}
};

// Fetch all Clients
exports.findAll = (req, res) => {
	try {
		Client.findAll({
			attributes: ['id', ['client_firstname', 'clientFirstname'], ['client_lastname', 'clientLastname'],
				['client_email', 'clientEmail'], ['contact_name', 'contactname'], ['contact_phone', 'contactphone'],
				['contact_email', 'contactemail'],['client_details', 'clientDetails']],
			order: [
				['id', 'DESC'],
			],
		}).then(clients => {
			// Send all customers to Client
			res.json(clients);
		});
	} catch (err) {
		var error = resMessages.errors;
		res.json({ errorCode: error.error_500.errorCode, errorMessage: error.error_500.errorMessage });
		winston.info(`${err.status} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
	}
};

// Find a Client by Id
exports.findByPk = (req, res) => {
	try {
		Client.findByPk(req.params.clientId, {
			attributes: ['id', ['client_firstname', 'clientFirstname'], ['client_lastname', 'clientLastname'],
				['client_email', 'clientEmail'], ['client_details', 'clientDetails'], ['contact_name', 'contactname'], ['contact_phone', 'contactphone'],
				['contact_email', 'contactemail'], ['supervisor_firstname', 'supervisorFirstname'],
				['supervisor_lastname', 'supervisorLastname'], ['supervisor_phonenumber', 'supervisorPhonenumber'],
				['supervisor_email', 'supervisorEmail'], ['timesheet_firstname', 'timesheetFirstname'],
				['timesheet_email', 'timesheetEmail'], ['timesheet_Phonenumber', 'timesheetPhonenumber']],
		}).then(clients => {
			res.json(clients);
		})
	} catch (err) {
		var error = resMessages.errors;
		res.json({ errorCode: error.error_500.errorCode, errorMessage: error.error_500.errorMessage });
		winston.info(`${err.status} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
	}
};

// Update a Client
exports.update = (req, res) => {
	try {
		// Save to MySQL database
		let client = {
			client_firstname: req.body.clientFirstname,
			client_lastname: req.body.clientLastname,
			client_email: req.body.clientEmail,
			client_details: req.body.clientDetails,
			contact_name: req.body.contactname,
			contact_email: req.body.contactemail,
			contact_phone: req.body.contactphone,
			supervisor_firstname: req.body.supervisorFirstname,
			supervisor_lastname: req.body.supervisorLastname,
			supervisor_phonenumber: req.body.supervisorPhonenumber,
			supervisor_email: req.body.supervisorEmail,
			timesheet_firstname: req.body.timesheetFirstname,
			timesheet_email: req.body.timesheetEmail,
			timesheet_phonenumber: req.body.timesheetPhonenumber,
		};
		let id = req.body.id;
		Client.update(client,
			{ where: { id: id } }
		).then(() => {
			res.status(200).json({ msg: "updated successfully client with id = " + id });
		});
	} catch (err) {
		var error = resMessages.errors;
		res.json({ errorCode: error.error_500.errorCode, errorMessage: error.error_500.errorMessage });
		winston.info(`${err.status} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
	}
};

// Delete a Client by Id
exports.delete = (req, res) => {
	try {
		const id = req.params.clientId;
		Client.destroy({
			where: { id: id }
		}).then(() => {
			res.status(200).json({ msg: 'Client deleted successfully id = ' + id });
		});
	} catch (err) {
		var error = resMessages.errors;
		res.json({ errorCode: error.error_500.errorCode, errorMessage: error.error_500.errorMessage });
		winston.info(`${err.status} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
	}
};

