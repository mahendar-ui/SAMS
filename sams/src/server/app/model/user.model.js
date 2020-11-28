module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
	 
	  name: {
			type: Sequelize.STRING
	  },
	  email: {
		  type: Sequelize.STRING
	  },
	  phone_number:{
		  type: Sequelize.STRING
	  },
	  roles:{
		type: Sequelize.STRING
	  }
	},{
		timestamps: false
	});
	
	return User;
}