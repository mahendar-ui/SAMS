module.exports = (sequelize, Sequelize) => {
	const Client = sequelize.define('client', {

		client_firstname: {
			type: Sequelize.STRING
		},
		client_lastname: {
			type: Sequelize.STRING
		},
		client_phonenumber: {
			type: Sequelize.STRING
		},
		contact_name: {
			type: Sequelize.STRING
		},
		contact_email: {
			type: Sequelize.STRING
		},
		contact_phone: {
			type: Sequelize.STRING
		},
		client_email: {
			type: Sequelize.STRING
		},
		client_address: {
			type: Sequelize.STRING
		},
		client_details: {
			type: Sequelize.STRING
		},
		// client_faxnumber: {
		// 	type: Sequelize.STRING
		// },
		supervisor_firstname: {
			type: Sequelize.STRING
		},
		supervisor_lastname: {
			type: Sequelize.STRING
		},
		supervisor_phonenumber: {
			type: Sequelize.STRING
		},
		supervisor_email: {
			type: Sequelize.STRING
		},
		timesheet_firstname: {
			type: Sequelize.STRING
		},
		timesheet_email: {
			type: Sequelize.STRING
		},
		timesheet_phonenumber: {
			type: Sequelize.STRING
		},
		user_id: {
			type: Sequelize.STRING
		},
	},
		{
			timestamps: false
		});

	return Client;
}