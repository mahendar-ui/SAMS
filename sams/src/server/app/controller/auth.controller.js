const db = require('../config/db.config.js');
const User = db.users;
const jwt = require('jsonwebtoken');
 
// Fetch all Customers
exports.findOne = (req, res) => {
    console.log(req.body);
	User.findOne({where : {'email':req.body.email}}).then(user => {
      // Send all customers to Client
      //console.log(user);
      if(!user){
          res.json('Authentication Fail')
      }else{  
          console.log(user);
		var token = jwt.sign({
			exp: Math.floor(Date.now() / 1000) + (60 * 60),
			data: user
		  }, 'pixehubinvoicapp');
          res.json({
              success:true,
              userInfo : user,
              message:'authenticated',
              accessToken:token,
          })
      }
	  res.json(user);
	});
};