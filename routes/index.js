var express = require('express');
var router = express.Router();

var pages = require('./pages');
var users = require('./users.js');
var auth = require('./auth.js');
var debug = require('./debug.js');
var merchants = require('./merchants.js');
var transfers = require('./transfers.js');
var transactions = require('./transactions.js');

router.get('/', pages.index);
router.get('/dev', pages.dev);
router.post('/authenticate', auth.login);
router.get('/account', pages.account);
router.get('/transactions', pages.transactions);
router.get('/transfers', pages.transfers);
router.get('/report', pages.report);
router.get('/portfolio', pages.portfolio);
router.get('/investment', pages.investment);
router.get('/recommend', pages.recommend);
router.get('/overview', pages.overview);

router.get('/api/merchant/:id', merchants.getOne);
router.get('/api/user/:id', users.getOne);

router.get('/api/transactions/:id', transactions.getAll);
//router.get('/api/transaction/:id', transactions.getOne);
router.get('/api/transfers/out/:id', transfers.getAllOut);
router.get('/api/transfers/in/:id', transfers.getAllIn);


//router.post('/createUser', users.create);
router.post('/dummyData', debug.dummyData);


module.exports = router;