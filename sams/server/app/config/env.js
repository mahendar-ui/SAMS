const env = {
  database: 'sams_collection',
  username: 'root',
  password: 'Mahi@123',
  host: 'localhost',
  dialect: 'mysql',
  timezone: 'utc',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};

module.exports = env;