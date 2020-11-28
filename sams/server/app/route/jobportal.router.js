module.exports = function(app) {
 
    const jobportals = require('../controller/jobportal.controller.js');

    // Create a new Client
    app.post('/api/create-jobportal', jobportals.create);
 
    // Retrieve all employess
    app.get('/api/jobportals', jobportals.findAll);

    app.get('/api/jobportals/:jobportalId', jobportals.findByPk);

    // Update a Customer with Id
    app.put('/api/jobportals', jobportals.update); 
    
     // Delete a Customer with Id
     app.delete('/api/jobportals/:jobportalId', jobportals.delete);
}