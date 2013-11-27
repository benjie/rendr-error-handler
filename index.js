var express = require('express')
  , rendr = require('rendr')
  , app = express();

app.use(express.compress());
app.use(express.static(__dirname + '/public'));
app.use(express.logger());
app.use(express.bodyParser());

var dataAdapterConfig = {
  'default': {
    host: 'api.github.com',
    protocol: 'https'
  }
};

/* We want to handle any error, so set up some errorHandler middleware
 * and have it called by both express directly and the rendrExpressApp
 */
function errorHandler(err, req, res, next) {
  console.log("WE REACHED THE ERROR HANDLER!");
  var status = err.status || 500;
  var message = err.message || "Internal Server Error";
  res.status(err.status || 500);
  res.send("<h1>Error " + status + " occurred</h1><h2>" + message + "</h2>");
}
app.use(errorHandler);

var server = rendr.createServer({
  dataAdapterConfig: dataAdapterConfig,
  errorHandler: errorHandler //< This is how you handle errors in rendr controllers/etc
});

app.use(server);

server.configure(function(rendrExpressApp) {
  //rendrExpressApp.use(errorHandler); //< Doesn't seem to be necessary?
});

function start(){
  var port = process.env.PORT || 3030;
  app.listen(port);
  console.log("server pid %s listening on port %s in %s mode",
    process.pid,
    port,
    app.get('env')
  );
}

if (require.main === module) {
  start();
}

exports.app = app;
