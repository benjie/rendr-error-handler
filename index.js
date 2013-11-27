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

var server = rendr.createServer({
  dataAdapterConfig: dataAdapterConfig
});

app.use(server);

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
