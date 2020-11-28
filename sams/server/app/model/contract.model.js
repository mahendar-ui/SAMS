module.exports = (sequelize, Sequelize) => {
	const Contract = sequelize.define('contract', {
	
		consultant_name:{
			type: Sequelize.STRING
        },
        job_id:{
            type: Sequelize.STRING 
		},
		start_date:{
            type: Sequelize.DATE 
		},
		end_date:{
            type: Sequelize.DATE 
		},
		employee_id:{
            type: Sequelize.STRING 
		},
		client_id:{
            type: Sequelize.STRING 
		},
		project_id:{
            type: Sequelize.STRING 
		},
		user_id:{
            type: Sequelize.STRING 
		},
		status:{
            type: Sequelize.STRING 
		},
		
	 },
	 {
		timestamps: false
	});
	
	return Contract;
}