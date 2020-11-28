module.exports = function(app) {
 
    const employees = require('../controller/employee.controller.js');
    //app.post('/api/users', users.findOne);
    // Create a new Customer
    app.post('/api/create-employee', employees.create);

}