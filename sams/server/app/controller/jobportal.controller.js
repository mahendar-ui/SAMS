const db = require('../config/db.config.js');
const JobPortal = db.jobportals;
const jwt = require('jsonwebtoken');

// Post a jobportal
exports.create = (req, res) => {	
	// Save to MySQL database
	let jobportals = {
		job_title:req.body.jobtitle,
		job_description:req.body.jobdescription,
		company_name:req.body.companyname,
		job_type:req.body.jobtype,
		start_date:req.body.startdate,
		end_date:req.body.enddate,
		skills_group:req.body.skillGroup,
		job_address:req.body.Address,
		job_location:req.body.location,
	};
	JobPortal.create(jobportals).then(result => {		
		// Send created jobportal
		res.json(result);
	});
};
// Fetch all Jobportals
exports.findAll = (req, res) => {
	JobPortal.findAll().then(jobportals => {
	  // Send all jobportal to Client
	  res.json(jobportals);
	});
};
// Find a Jobportal by Id
exports.findByPk = (req, res) => {	
	JobPortal.findByPk(req.params.jobportalId,{
		attributes: ['id', ['job_title', 'jobtitle'],['job_description', 'jobdescription'],
		['start_date','startdate'],['end_date','enddate'],['job_address','Address'],
		['job_location','location'],['company_name','companyname'],
		['job_type','jobtype'],['skills_group','skillGroup']]
	  }).then(jobportals => {
		res.json(jobportals);
	})
};

//  Update a Jobportal
exports.update = (req, res) => {
	let jobportal = {
		job_title:req.body.jobtitle,
		job_description:req.body.jobdescription,
		company_name:req.body.companyname,
		job_type:req.body.jobtype,
		start_date:req.body.startdate,
		end_date:req.body.enddate,
		skills_group:req.body.skillGroup,
		job_address:req.body.Address,
		job_location:req.body.location,
	};
	let id = req.body.id;
	JobPortal.update(jobportal, 
					 { where: {id: id} }
				   ).then(() => {
						 res.status(200).json({msg:"updated successfully employee with id = " + id});
				   });	
};

// Delete a job portal by Id
exports.delete = (req, res) => {
	const id = req.params.jobportalId;
	JobPortal.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).json({msg:'JobPortal deleted successfully id = ' + id});
	});
};