var models = require('../models');
var jwt = require('jsonwebtoken');
var validateUser = require('../routes/auth').validateUser;

module.exports = function(req, res, next) {
	var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) 
		|| req.headers['x-access-token'] || req.headers.authorization;
	//var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
	
	if (token) {
		try {
			var decoded = jwt.decode(token, require('../config/secret.js'));
			
			if (decoded.exp <= Date.now()) {
				res.end('Access token has expired', 400);
			}
			var fail = function() {
				res.status(401);
		        res.json({
		          "status": 401,
		          "message": "Invalid User"
		        });
			};
			var user = validateUser(decoded.iss, token, next, fail);
			/*if (user) {
				next();
			} else {
				res.status(401);
		        res.json({
		          "status": 401,
		          "message": "Invalid User"
		        });
		        return;
			}*/
		} catch(err) {
			console.log(err);
			res.status(500);
	    	res.json({
		        "status": 500,
		        "message": "Oops something went wrong",
		        "error": err
	    	});
		}
	} else {
		res.status(401);
		res.json({
			"status": 401,
			"message": "Invalid token",
	    });
	}
};
