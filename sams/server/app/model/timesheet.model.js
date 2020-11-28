module.exports = (sequelize, Sequelize) => {
	const Timesheet = sequelize.define('timesheet', {
	 
      invoice_name: {
			type: Sequelize.STRING
	  },
      invoice_created_date: {
		  type: Sequelize.STRING
	  },
	  status:{
		type: Sequelize.STRING  
	  }
	 },
	 {
		timestamps: false
	});
	
	return Timesheet;
}