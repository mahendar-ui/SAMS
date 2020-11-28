module.exports = function(app) {
 
    const projects = require('../controller/project.controller.js');
    //app.post('/api/users', users.findOne);
    // Create a new Client
    app.post('/api/create-project', projects.create);
 
        // Retrieve all employess
     app.get('/api/projects', projects.findAll);

     app.get('/api/projects/:projectId', projects.findByPk);

         // Update a Customer with Id
    app.put('/api/projects', projects.update);

      // Delete a Customer with Id
    app.delete('/api/projects/:projectId', projects.delete);

}