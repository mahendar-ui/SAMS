module.exports = (sequelize, Sequelize) => {
	const Employee = sequelize.define('employee', {
	 
		first_name: {
			type: Sequelize.STRING
	  },
	  last_name: {
		  type: Sequelize.STRING
	  },
	    email: {
		type: Sequelize.STRING
	  },
	  phone_number: {
	  type: Sequelize.STRING
	},
	address: {
		type: Sequelize.STRING
	  },
	  city: {
		type: Sequelize.STRING
	  },
	  pinCode: {
		type: Sequelize.STRING
	  },
	  experience_years: {
		type: Sequelize.STRING
	  },
	  previous_company: {
		type: Sequelize.STRING
	  },
	  gender: {
		type: Sequelize.STRING
	  },
	  birth_date: {
		type: Sequelize.STRING
	  },
	  visa_status: {
		type: Sequelize.STRING
	  },
	  skills: {
		type: Sequelize.STRING
	  },
	  hire_date: {
		type: Sequelize.STRING
	  },
	},{
		timestamps: false
	});
	
	return Employee;
}
