module.exports = function(app) {
 
    const timesheets = require('../controller/timesheet.controller');
 
        // Retrieve all timesheets
     app.get('/api/timesheets', timesheets.findAll);

     app.get('/api/timesheets/:timesheetId', timesheets.findByPk);

       // Create a new Client
    app.post('/api/send-email', timesheets.create);
 
}