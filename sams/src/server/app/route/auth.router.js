module.exports = function(app) {
 
    const auth = require('../controller/auth.controller.js');
 
    // Create a new Customer
    app.post('/api/authentication', auth.findOne);
 
}