module.exports = function(app) {
 
    const clients = require('../controller/client.controller.js');
    //app.post('/api/users', users.findOne);
    // Create a new Client
    app.post('/api/create-client', clients.create);

    // Retrieve all Clients
    app.get('/api/clients', clients.findAll);

    // Get the Clients by Id
    app.get('/api/clients/:clientId', clients.findByPk);

    // Update an Clients with Id
    app.put('/api/clients', clients.update);

     // Delete a Customer with Id
     app.delete('/api/clients/:clientId', clients.delete);

}