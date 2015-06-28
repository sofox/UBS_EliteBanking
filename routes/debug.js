var models = require("../models");

var debug = {
	dummyData: function(req, res) {
		models.ebinvestment.create({
			name: 'SingTel',
			code: 'Z74'
		});
		models.ebinvestment.create({
			name: 'OCBC Bank',
			code: 'O39'
		});
		models.ebinvestment.create({
			name: 'DBS',
			code: 'D05'
		});
		models.ebinvestment.create({
			name: 'Jardine C&C',
			code: 'C07'
		});
		models.ebinvestment.create({
			name: 'Noble',
			code: 'N21'
		});
		models.ebinvestment.create({
			name: 'SIA Engineering',
			code: 'S59'
		});
		models.ebmerchant.create({
			name: 'Starbucks'
		});
		models.ebmerchant.create({
			name: 'Elite Logistics'
		});
		models.ebmerchant.create({
			name: 'Challenger'
		});
		models.ebmerchant.create({
			name: 'Cycle And Carriage'
		});
		models.ebcustomer.create({
			email: 'john@email.com',
			password: 'securepass',
			name: 'John Smith',
			balance: 12749
		}).then(function(user) {
			models.ebmerchant.findOne({ where: {name: 'Starbucks'} })
			.then(function(merch){
				models.ebtransaction.create({
					account: user.id,
					merchant: merch.id,
					amount: 7.90
				});
			});
			models.ebportfolio.create({
				name: 'Low Risk',
				account: user.id
			}).then(function(portfolio){
				models.ebinvestment.findOne({ where: {code: 'S59'} })
				.then(function(inv) {
					models.ebp_i.create({
						quantity: 5,
						portfolio: portfolio.id,
						investment: inv.id
					});
				});
			});
			models.ebcustomer.create({
				email: 'harry@email.com',
				password: 'powerpass',
				name: 'Harry Johnson',
				balance: 2948
			}).then(function(user2){
				models.ebtransfer.create({
					from: user.id,
					to: user2.id,
					amount: 3000
				});
				models.ebtransfer.create({
					from: user2.id,
					to: user.id,
					amount: 4000
				});
				models.ebtransfer.create({
					from: user.id,
					to: user2.id,
					amount: 4232
				});
				models.ebtransfer.create({
					from: user.id,
					to: user2.id,
					amount: 325
				});
				models.ebtransfer.create({
					from: user.id,
					to: user2.id,
					amount: 454
				});
			});
			
			models.ebcustomer.create({
				email: 'molly@email.com',
				password: 'mollypass',
				name: 'Molly Miller',
				balance: 71274
			}).then(function(user3){
				models.ebtransfer.create({
					from: user.id,
					to: user3.id,
					amount: 20
				});
				models.ebtransfer.create({
					from: user3.id,
					to: user.id,
					amount: 1982
				});
				models.ebtransfer.create({
					from: user3.id,
					to: user.id,
					amount: 234
				});
				models.ebtransfer.create({
					from: user3.id,
					to: user.id,
					amount: 253
				});
				models.ebtransfer.create({
					from: user3.id,
					to: user.id,
					amount: 432
				});
				models.ebtransfer.create({
					from: user3.id,
					to: user.id,
					amount: 343
				});
			});
		});
	},
};

module.exports = debug;