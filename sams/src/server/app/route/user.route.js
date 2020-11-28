module.exports = function(app) {
 
    const users = require('../controller/user.controller.js');
    //app.post('/api/users', users.findOne);
    // Create a new Customer
    app.post('/api/users', users.create);
 
    // Retrieve all Customer
    app.get('/api/users', users.findAll);
 
    // Retrieve a single Customer by Id
    //app.get('/api/users/:userId', users.findById);
 
    // Update a Customer with Id
    app.put('/api/users', users.update);
 
    // Delete a Customer with Id
    app.delete('/api/users/:userId', users.delete);

    
}