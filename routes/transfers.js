var models = require('../models');

var transfers = {
	getAllOut: function(req, res) {
		var id = req.params.id;
		models.ebtransfer.findAll({ where: {from: id} })
		.then(function(transfers){
			res.json(transfers);
			return;
		}).catch(function(){
			res.status(404);
		});
	},
	getAllIn: function(req, res) {
		var id = req.params.id;
		models.ebtransfer.findAll({ where: {to: id} })
		.then(function(transfers){
			res.json(transfers);
			return;
		}).catch(function(){
			res.status(404);
		});
	},
};
 
module.exports = transfers;