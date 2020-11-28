module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
	 
	  username: {
			type: Sequelize.STRING
	  },
	  fullname:{
        type:Sequelize.STRING
	  },
	  email: {
		  type: Sequelize.STRING
	  },
	  phone_number: {
		type: Sequelize.STRING
	},
	  password:{
		type: Sequelize.STRING
	  },
	  stakeholder:{
		type: Sequelize.STRING
	  },
	  stakeholder_university:{
		type: Sequelize.STRING
	  },
	  stakeholder_bank:{
		type: Sequelize.STRING
	  }
	},{
		timestamps: false
	});
	
	return User;
}