const path = require('path');
const express = require('express');
const webpack = require('webpack');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch')

const isProduction = process.env.NODE_ENV === 'production';
const config = isProduction ? require('./webpack.config.prod') : require('./webpack.config.dev');
const compiler = webpack(config);
const port = isProduction ? process.env.PORT : 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if(!isProduction){
	app.use(require('webpack-dev-middleware')(compiler, {
	  noInfo: true,
	  publicPath: config.output.publicPath
	}));
	
	app.use(require('webpack-hot-middleware')(compiler));
} else {
	// ping heroku app every 5 minutes to prevent from going idle
	setInterval(function() {
	    fetch("http://gitscout.herokuapp.com");
	    console.log("aplication pinged to avoid idle state")
	}, 300000);

	app.use(express.static(__dirname));
}

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  isProduction ? console.info("==> 🌎  Application up and running", port) : console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
});
