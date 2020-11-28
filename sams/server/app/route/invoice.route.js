module.exports = function(app) {
 
    const invoices = require('../controller/invoice.controller.js');

    // Create a new Client
    app.post('/api/create-invoice', invoices.create);
 
         // Retrieve all employess
     app.get('/api/invoices', invoices.findAll);

     app.get('/api/invoices/:invoiceId', invoices.findByPk);
}