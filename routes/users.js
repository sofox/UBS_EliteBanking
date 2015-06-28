var models = require("../models");

var user = {
	create: function(req, res) {
		models.ebcustomer.create({
			email: req.body.email,
			password: req.body.password,
			name: req.body.name		
		}).then(function(user){
			res.json(user.dataValues);
		}).catch(function(error){
	        console.log("ops: " + error);
	        res.status(500).json({ error: 'error' });
	    });
	},
	getOne: function(req, res) {
		var id = req.params.id;
		models.ebcustomer.findOne({ where: {id: id} })
		.then(function(user){
			user.password = '';
			res.json(user);
			return;
		}).catch(function(){
			res.status(404);
		});
	}
};

module.exports = user;