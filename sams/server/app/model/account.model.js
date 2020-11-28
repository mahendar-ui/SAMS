module.exports = (sequelize, Sequelize) => {
	const Account_Application = sequelize.define('account_application', {
		user_id: {
			type: Sequelize.NUMBER
	  },
	  firstname: {
			type: Sequelize.STRING
	  },
	  lastname:{
        type:Sequelize.STRING
	  },
	  student_email: {
		  type: Sequelize.STRING
	  },
	  student_id: {
		type: Sequelize.STRING
	},
	  phone_number: {
		type: Sequelize.STRING
	},
	  university:{
		type: Sequelize.STRING
	  },
	  bank:{
		type: Sequelize.STRING
	  },
	  address:{
		type: Sequelize.STRING
	  },
	  city:{
		type: Sequelize.STRING
	  },
	  postcode:{
		type: Sequelize.STRING
	  },
	  status:{
		type: Sequelize.STRING
	  },
	  course:{
		type: Sequelize.STRING
	  },
	  request_uad:{
		type:Sequelize.STRING
	  },
	  account_passport:{
		type:Sequelize.STRING
	  },
	  brp_number:{
		type:Sequelize.STRING
	  },
	  message:{
		type: Sequelize.STRING
	  },
	  bos_message:{
		type: Sequelize.STRING
	  },
	  uad_message:{
		type: Sequelize.STRING
	  },
	},{
		timestamps: false
	});
	
	return Account_Application;
}