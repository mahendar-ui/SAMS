module.exports = function(app) {
    const verifyToken = require('../middleware/tokenChecker');
    const account = require('../controller/account.application.controller.js');
    // Create a new user
    app.post('/api/account', account.create);
 
    // Retrieve all user
    app.post('/api/accounts', account.findAll);
    // Retrieve a single user by Id
    app.get('/api/account/:accountId', account.findByPk);
 
    // Update a user with Id
    app.put('/api/users', account.update);
 
    // Delete a user with Id
    app.delete('/api/users/:userId', account.delete);
    app.put('/api/account-to-bank', account.updateBankRequest)
    app.put('/api/reject-application', account.rejectApplication)
    app.put('/api/approve-application', account.approveApplication)
    // app.post('/api/users', verifyToken, users.create);
 
    // app.get('/api/users',verifyToken, users.findAll);
}