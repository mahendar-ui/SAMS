const db = require('../config/db.config.js');
const Contract = db.contracts;
const Project = db.projects;
const Client = db.clients;
const Employee = db.employees;
const jwt = require('jsonwebtoken');
const { contracts } = require('../config/db.config.js');
Contract.belongsTo(Project, { foreignKey: 'project_id' });
Contract.belongsTo(Employee, { foreignKey: 'employee_id' });
Contract.belongsTo(Client, { foreignKey: 'client_id' });
Project.hasMany(Contract, { foreignKey: 'id' });
Employee.hasMany(Contract, { foreignKey: 'id' });
Client.hasMany(Contract, { foreignKey: 'id' });
// Post a contract
exports.create = (req, res) => {
	try {
		let startdate = new Date(req.body.startdate);
		let enddate = new Date(req.body.enddate);
		// Save to MySQL database
		let contracts = {
			consultant_name: req.body.consultname,
			job_id: req.body.jobid,
			start_date: startdate.getTime() - (startdate.getTimezoneOffset() * 60000),
			end_date: enddate.getTime() - (startdate.getTimezoneOffset() * 60000),
			project_id: req.body.projectid,
			client_id: req.body.clientid,
			user_id: req.body.user_id,
			employee_id: req.body.employeeid,
			status: req.body.contract_status,
		};
		Contract.create(contracts).then(result => {
			// Send created contract
			res.json(result);
		});
		let id = req.body.employeeid;
		Employee.update(contracts,
			{ where: { id: id } });
	} catch (err) {
		res.send(error)
	}
};
// Fetch all contracts
exports.findAll = (req, res) => {
	Contract.findAll({
		include: [Project, Employee, Client], attributes: ['id', ['consultant_name', 'consultname'],
			['job_id', 'jobid'], ['start_date', 'startdate'], ['end_date', 'enddate'],
			['project_id', 'projectid'],
			['client_id', 'clientid'], ['employee_id', 'employeeid'], ['status', 'contract_status'],],
		order: [
			['id', 'DESC'],
		],
	}).then(contracts => {
		// Send all customers to contracts
		res.json(contracts);
	});
};
// Delete a Contract by Id
exports.delete = (req, res) => {
	const id = req.params.contractId;
	Contract.destroy({
		where: { id: id }
	}).then(() => {
		res.status(200).json({ msg: 'Contract deleted successfully id = ' + id });
	});
};
//  Update a employee
exports.update = (req, res) => {
	// Save to MySQL database
	let contract = {
		status: req.body.contract_status,
	};
	let id = req.body.id;
	Contract.update(contract,
		{ where: { id: id } }
	).then(() => {
		res.status(200).json({ msg: "updated successfully contract with id = " + id });
	});
};
// Find a Employee by Id
exports.findByPk = (req, res) => {
	Contract.findByPk(req.params.contractId, {
		include: [Project, Employee, Client], attributes: ['id', ['consultant_name', 'consultname'],
			['job_id', 'jobid'], ['start_date', 'startdate'], ['end_date', 'enddate'],
			['project_id', 'projectid'],
			['client_id', 'clientid'], ['employee_id', 'employeeid'], ['status', 'contract_status'],]
	}).then(contracts => {
		res.json(contracts);
	})
};
//  Update a contract
exports.update = (req, res) => {
	let startdate = new Date(req.body.startdate);
	let enddate = new Date(req.body.enddate);
	let contract = {
		start_date: startdate.getTime() - (startdate.getTimezoneOffset() * 60000),
		end_date: enddate.getTime() - (startdate.getTimezoneOffset() * 60000),
		status: req.body.contract_status,
	};
	let id = req.body.id;
	Contract.update(contract,
		{ where: { id: id } }
	).then(() => {
		res.status(200).json({ msg: "updated successfully employee with id = " + id });
	});
};