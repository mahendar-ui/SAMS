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
		pincode: {
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
		skillGroup: {
			type: Sequelize.STRING
		},
		hire_date: {
			type: Sequelize.STRING
		},
		id_proof: {
			type: Sequelize.STRING
		},
		visa_type: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		},
		employee_id:{
            type: Sequelize.STRING 
		},
		user_id:{
            type: Sequelize.STRING 
		},
	}, {
		timestamps: false
	});

	return Employee;
}
