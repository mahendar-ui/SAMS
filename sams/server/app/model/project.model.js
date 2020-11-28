module.exports = (sequelize, Sequelize) => {
	const Project = sequelize.define('project', {

		project_type: {
			type: Sequelize.STRING
		},
		project_title: {
			type: Sequelize.STRING
		},
		project_owner: {
			type: Sequelize.STRING
		},
		project_rate: {
			type: Sequelize.STRING
		},
		project_location: {
			type: Sequelize.STRING
		},
		client_rate: {
			type: Sequelize.STRING
		},
		project_start_date: {
			type: Sequelize.DATE
		},
		project_end_date: {
			type: Sequelize.DATE
		},
		user_id: {
			type: Sequelize.STRING
		},
	},
		{
			timestamps: false
		});

	return Project;
}