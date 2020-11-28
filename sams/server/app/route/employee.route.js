module.exports = function(app) {
 
    const employees = require('../controller/employee.controller.js');
    //app.post('/api/users', users.findOne);
    // Create a new Customer
    app.post('/api/create-employee', employees.create);

    // Retrieve all employess
    app.get('/api/employees', employees.findAll);

    app.get('/api/employees/:employeeId', employees.findByPk);

    // Update a Customer with Id
    app.put('/api/employees', employees.update);

    // Delete a Customer with Id
    app.delete('/api/employees/:employeeId', employees.delete);

}