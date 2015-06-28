var models = require('../models');

var merchants = {
	getOne: function(req, res) {
		var id = req.params.id;
		models.ebmerchant.findOne({ where: {id: id} })
		.then(function(merchant){
			res.json(merchant);
			return;
		}).catch(function(){
			res.status(404);
		});
	},
};
 
module.exports = merchants;