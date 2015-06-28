var models = require('../models');

var transactions = {
	getAll: function(req, res) {
		var id = req.params.id;
		models.ebtransaction.findAll({ where: {account: id} })
		.then(function(transactions){
			res.json(transactions);
			return;
		}).catch(function(){
			res.status(404);
		});
	},
};
 
module.exports = transactions;