module.exports = (sequelize, Sequelize) => {
	const Invoice = sequelize.define('invoice', {
	 
      firstName: {
			type: Sequelize.STRING
	  },
      email: {
		  type: Sequelize.STRING
	  },
      phoneNumber:{
		  type: Sequelize.STRING
	  },
      jobId:{
		type: Sequelize.STRING
	  },
	  date:{
		type: Sequelize.STRING
	  },
	  Address:{
		type: Sequelize.STRING
	  },
	  city:{
		type: Sequelize.DATE
	  },
	  pincode:{
		type: Sequelize.DATE
	  }
	 },
	 {
		timestamps: false
	});
	
	return Invoice;
}