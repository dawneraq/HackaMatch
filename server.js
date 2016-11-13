var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    dotenv          = require('dotenv'),
    bodyParser      = require('body-parser');

var app = express();

dotenv.load();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
});

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler())
}

//can split up url into other files
app.use(require('./Backend/user-routes'));

var port = process.env.PORT || 3002;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});

