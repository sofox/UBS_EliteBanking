var jwt = require('jsonwebtoken');
var moment = require('moment');
var models = require("../models");

var auth = {
	login: function(req, res) {
		try {
			var uEmail = req.body.email;
			var uPass = req.body.password;
			var app = req.app;
			if (uEmail == '' || uPass == '') {
				res.status(401);
				res.json({
					'status': 401,
					'message': 'Invalid credentials'
				});
				return;
			}
			models.ebcustomer.findOne({ where: {email: uEmail} })
			.then(function(user) {
				if (user == null) {
					res.status(401);
					res.json({
						'status': 401,
						'message': 'User not found'
					});
					return;
				}
				else {
					if (user.password == uPass) {
						//authenticated ok
						res.json(genToken(user));
					}
					else {
						// wrong pass
						res.status(401);
						res.json({
							'status': 401,
							'message': 'Wrong password'
						});
						return;
					}	
				}
			});
		}
		catch (error) {
			console.log("ops: " + error);
	        res.status(500).json({ error: 'error' });
		}
	},
	validate: function(email, pass) {
		models.ebcustomer.findOne({ where: {email:email, password:pass}})
		.then(function(user) {
			return user;
		});
		return null;
	},
	validateUser: function(id, token, next, fail) {
		models.ebcustomer.findOne({ where: {id:id}})
		.then(function(user) {
			if (user != null && user.token == token) {
				next();
			}
			else
				fail();
		});
	},
};

function genToken(user) {
	var expires = moment().add(2, 'days').valueOf();
	var token = jwt.sign({
		iss : user.id,
		exp : expires
	}, require('../config/secret')());
	models.ebcustomer.update({
		token : token
	}, {
		where : { id : user.id } 
	});
	return {
		token: token,
		expires: expires,
		user: user.toJSON()
	};
}

module.exports = auth;