const express = require('express')
const app = express();
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
app.use(bodyParser.json())
const port = 3000;

const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
const db = require('./app/config/db.config.js');
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync with { force: true }');
//   initial();
// });
//app.get('/api/users', (req, res) => res.send('Hello World!'))
require('./app/route/auth.router.js')(app);
require('./app/route/user.route.js')(app);
require('./app/route/employee.route.js')(app);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))