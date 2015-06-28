
var pages = {
	index: function(req, res) {
		res.render('index', {title : 'Elite Banking'});
	},
	dev: function(req, res) {
		res.render('development', {title: 'EB DEBUG'});
	},
	account: function(req, res) {
		res.render('account', {title: 'Elite Banking'});
	},
	transactions: function(req, res) {
		res.render('transactions', {title: 'Elite Banking'});
	},
	transfers: function(req, res) {
		res.render('transfers', {title: 'Elite Banking'});
	},
	report: function(req, res) {
		res.render('report', {title: 'Elite Banking'});
	},
	portfolio: function(req, res) {
		res.render('portfolio', {title: 'Elite Banking'});
	},
	investment: function(req, res) {
		res.render('investment', {title: 'Elite Banking'});
	},
	recommend: function(req, res) {
		res.render('recommend', {title: 'Elite Banking'});
	},
	overview: function(req, res) {
		res.render('overview', {title: 'Elite Banking'});
	},
};

module.exports = pages;