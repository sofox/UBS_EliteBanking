"use strict";

module.exports = function(sequelize, DataTypes) {
	var Sequelize = require('sequelize');
    var ebtransfer = sequelize.define("ebtransfer", {
    	id : { type : Sequelize.UUID, allowNull : false, defaultValue: Sequelize.UUIDV1, primaryKey: true },
        from: { type : Sequelize.UUID },
    	to: { type : Sequelize.UUID },
    	date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    	amount: { type : Sequelize.INTEGER }
    });

    return ebtransfer;
};