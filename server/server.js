const path = require('path');
const express = require('express');
const webpack = require('webpack');
const app = express();
const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');
const request = require('request');

const isProduction = process.env.NODE_ENV === 'production';
const config = isProduction ? require('./webpack.config.prod') : require('./webpack.config.dev');
const compiler = webpack(config);
const port = isProduction ? process.env.PORT : 3000;

const db = require('./db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if(!isProduction){
	app.use(require('webpack-dev-middleware')(compiler, {
	  noInfo: true,
	  publicPath: config.output.publicPath
	}));
	
	app.use(require('webpack-hot-middleware')(compiler));
} else {
	// ping heroku every 5 minutes to prevent from going idle
	setInterval(function() {
	    fetch("http://gitscout.herokuapp.com");
	    console.log("aplication pinged to avoid idle state")
	}, 300000);

	app.use(express.static(__dirname));
}


// ROUTES
app.get('/github_api',function(req,res){
	var options = { method: 'GET',
		url: 'https://api.github.com'+req.query.endpoint,
		qs: { 
			client_id: process.env.client_id,
			client_secret: process.env.client_secret
		},
		headers:{
			'user-agent': 'gitscout'
		}
	};

	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		var json = JSON.parse(body)

		if (json.login || json.message) { 
			// If incoming request was a verification request, log it to the db and send search count
			var username = json.login || req.query.endpoint.split("/")[2]
			db.createQuery(username, true) 
			db.getRecentQueries(username)
				.then(function(searchCount){
					json.searchCount = searchCount
					res.json(json)
				})
		} else {
			res.json(json)
		}


	});
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/../client/index.html'))
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  isProduction ? console.info("==> 🌎  Application up and running", port) : console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
});
