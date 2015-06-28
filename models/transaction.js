"use strict";

module.exports = function(sequelize, DataTypes) {
	var Sequelize = require('sequelize');
    var ebtransaction = sequelize.define("ebtransaction", {
    	id : { type : Sequelize.UUID, allowNull : false, defaultValue: Sequelize.UUIDV1, primaryKey: true },
    	merchant : { type : Sequelize.UUID, allowNull : false },
        date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
        amount: { type: Sequelize.FLOAT, allowNull : false },
        account : {type : Sequelize.UUID, allowNull : false }
    });

    return ebtransaction;
};