require('dotenv').config();
const app = require('express')();
const OpenTok = require("opentok");
const cors = require('cors');

const opentok = new OpenTok(process.env.API_KEY, process.env.API_SECRET);

// var whitelist = ['http://localhost:3000/']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

app.use(cors());

// Create a session and store it in the express app
opentok.createSession(function(err, session) {
  if (err) throw err;
  app.set('sessionId', session.sessionId);
  // We will wait on starting the app until this is done
  init();
});

app.get('/', function(req, res) {
    res.send("Ping");
});

app.get('/generate', function(req, res) {
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
    app.listen(5000, function() {
      console.log('You\'re app is now ready at http://localhost:5000/');
    });
  }