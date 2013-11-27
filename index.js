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
  // Calling process.exit to make it very clear this is never called.
  process.exit(1);
}
app.use(errorHandler);

var server = rendr.createServer({
  dataAdapterConfig: dataAdapterConfig,
});

app.use(server);

server.configure(function(rendrExpressApp) {
  rendrExpressApp.use(errorHandler);
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
