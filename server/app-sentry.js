const express = require('express');
const Sentry = require('@sentry/node');
const app = express();
const port = 3000
//logger
Sentry.init({ dsn: 'https://7f835850c3df4f2a8558feb28c40731a@o433658.ingest.sentry.io/5389274' });
app.use(Sentry.Handlers.requestHandler());
app.get('/', function rootHandler(req, res) {
  res.end('Hello world!');
});
app.get('/debug-sentry', function mainHandler(req, res) {
  throw new Error('My first Sentry error!');
});
app.use(Sentry.Handlers.errorHandler({
  shouldHandleError(error) {
    // Capture all 404 and 500 errors
    if (error.status === 404 || error.status === 500) {
      return true
    }
    return false
  }
}));
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})