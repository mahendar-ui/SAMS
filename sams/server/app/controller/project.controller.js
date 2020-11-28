const db = require('../config/db.config.js');
const Project = db.projects;
const jwt = require('jsonwebtoken');
const { projects } = require('../config/db.config.js');
const models = require('../model/project.model');
const moment = require('moment'); 
// Post a project
exports.create = (req, res) => {
	let startdate = new Date(req.body.startdate);
	let enddate = new Date(req.body.enddate);
	// Save to MySQL database
	let projects = {
		project_title: req.body.projecttitle,
		project_owner: req.body.projectowner,
		project_rate: req.body.projectrate,
		project_type: req.body.projecttype,
		client_rate: req.body.clientrate,
		project_location: req.body.location,
		project_start_date: startdate.getTime() - (startdate.getTimezoneOffset() * 60000),
		project_end_date: enddate.getTime() - (startdate.getTimezoneOffset() * 60000),
		user_id: req.body.user_id,
	};
	Project.create(projects).then(result => {
		// Send created customer to client
		res.json(result);
	});
};

// Fetch all Customers
exports.findAll = (req, res) => {
	Project.findAll({
		model: models.Project,
		attributes: ['id', ['project_title', 'projecttitle'], ['project_owner', 'projectowner'],
			['project_rate', 'projectrate'], ['project_type', 'projecttype'], ['client_rate', 'clientrate'], ['project_location', 'location']
			, ['project_start_date', 'startdate'], ['project_end_date', 'enddate']],
		order: [
			['id', 'DESC'],
		],
	}).then(projects => {
		// Send all customers to Client
		res.json(projects);
	});
};

// Find a Client by Id
exports.findByPk = (req, res) => {
	Project.findByPk(req.params.projectId, {
		model: models.Project, attributes: ['id', ['project_title', 'projecttitle'], ['project_owner', 'projectowner'],
			['project_rate', 'projectrate'], ['project_type', 'projecttype'], ['client_rate', 'clientrate'], ['project_location', 'location']
			, ['project_start_date', 'startdate'], ['project_end_date', 'enddate']]
	}).then(projects => {
		res.json(projects);
	})
};

//  Update a Customer
exports.update = (req, res) => {
	let startdate = new Date(req.body.startdate);
	let enddate = new Date(req.body.enddate);
	// Save to MySQL database
	let project = {
		project_title: req.body.projecttitle,
		project_owner: req.body.projectowner,
		project_rate: req.body.projectrate,
		project_type: req.body.projecttype,
		client_rate: req.body.clientrate,
		project_location: req.body.location,
		project_start_date: startdate.getTime() - (startdate.getTimezoneOffset() * 60000),
		project_end_date: enddate.getTime() - (startdate.getTimezoneOffset() * 60000),
	};
	let id = req.body.id;
	Project.update(project,
		{ where: { id: id } }
	).then(() => {
		res.status(200).json({ msg: "updated successfully project with id = " + id });
	});
};

// Delete a Customer by Id
exports.delete = (req, res) => {
	const id = req.params.projectId;
	Project.destroy({
		where: { id: id }
	}).then(() => {
		res.status(200).json({ msg: 'Project deleted successfully id = ' + id });
	});
};
