module.exports = function(app) {
    const verifyToken = require('../middleware/tokenChecker');
    const auth = require('../controller/auth.controller.js');
   
    // Check user
    app.post('/api/authentication', auth.findOne);
    
    //Check authentication token
    app.get('/api/token_verify', verifyToken, auth.checkToken);
}