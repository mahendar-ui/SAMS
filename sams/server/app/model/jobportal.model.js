module.exports = (sequelize, Sequelize) => {
	const JobPortal = sequelize.define('jobportal', {
	 
      job_title: {
			type: Sequelize.STRING
	  },
      job_description: {
		  type: Sequelize.STRING
	  },
      start_date:{
		  type: Sequelize.STRING
	  },
	  end_date:{
		type: Sequelize.STRING
	  },
	  job_address:{
		type: Sequelize.STRING
	  },
	  job_location:{
		type: Sequelize.STRING
	  },
	  company_name:{
		type: Sequelize.STRING
	  },
	  job_type:{
		type: Sequelize.STRING
	  },
	  skills_group:{
		type: Sequelize.STRING
	  }
	 },
	 {
		timestamps: false
	});
	
	return JobPortal;
}