module.exports = function(app) {
    const verifyToken = require('../middleware/tokenChecker');
    const users = require('../controller/user.controller.js');
    // Create a new user
    app.post('/api/users', users.create);
 
    // Retrieve all user
    app.get('/api/users', users.findAll);
    // Retrieve a single user by Id
    app.get('/api/users/:userId', users.findByPk);
 
    // Update a user with Id
    app.put('/api/users', users.update);
 
    // Delete a user with Id
    app.delete('/api/users/:userId', users.delete);

    // app.post('/api/users', verifyToken, users.create);
 
    // app.get('/api/users',verifyToken, users.findAll);
    // update password
    app.put('/api/password-change', users.passwordupdate);

    //profile update
    app.put('/api/profile-update', users.profileupdate);
}