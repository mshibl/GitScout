var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://vdqnhcimbegyde:2kFnd2E2EZnLSkHBQqTRoptVXF@ec2-54-243-249-165.compute-1.amazonaws.com:5432/d39i8d7sgp7qm0?ssl=true';
var db = pgp(connectionString);

function getRecentQueries(username) {
	return (  
		db.any("select * from queries " + 
		  	"where timestamp > current_timestamp - interval '1 hour' " +
		  	"and username = ${username}",
		  	{username: username}
  		)
	    .then(function (data) {
	    	return data.length
	    })
	    .catch(function (err) {
	      return err;
	    })
    )
}

function createQuery(username, status) {
	return(
		db.none('insert into queries(username, status)' + 'values(${username}, ${status})', 
			{username: username, status: status})
			.then(function () {
				return true
			})
			.catch(function (err) {
				return err;
			})
	)
}

module.exports = {
	getRecentQueries: getRecentQueries,
	createQuery: createQuery
};