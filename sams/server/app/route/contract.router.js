module.exports = function(app) {
 
    const contracts = require('../controller/contract.controller.js');
    // Create a new contract
    app.post('/api/create-contract', contracts.create);

      // Retrieve all contracts
    app.get('/api/contracts', contracts.findAll);

    // Delete a contracts with Id
    app.delete('/api/contracts/:contractId', contracts.delete);

     // Update a Customer with Id
     app.put('/api/contracts', contracts.update);

     app.get('/api/contracts/:contractId', contracts.findByPk);
     // Update a Customer with Id
    app.put('/api/contracts', contracts.update);
}