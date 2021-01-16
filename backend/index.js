require('dotenv').config();
const app = require('express')();
const OpenTok = require("opentok");

const opentok = new OpenTok(process.env.API_KEY, process.env.API_SECRET);

// Create a session and store it in the express app
opentok.createSession(function(err, session) {
  if (err) throw err;
  app.set('sessionId', session.sessionId);
  // We will wait on starting the app until this is done
  init();
});

app.get('/', function(req, res) {
    var sessionId = app.get('sessionId'),
        // generate a fresh token for this client
        token = opentok.generateToken(sessionId);
  
        res.send({
            apiKey: process.env.API_KEY,
            sessionId: sessionId,
            token: token
        });
  });

  function init() {
    app.listen(3000, function() {
      console.log('You\'re app is now ready at http://localhost:3000/');
    });
  }