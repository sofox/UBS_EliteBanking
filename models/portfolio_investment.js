"use strict";

module.exports = function(sequelize, DataTypes) {
	var Sequelize = require('sequelize');
    var ebp_i = sequelize.define("ebp_i", {
    	id : { type : Sequelize.UUID, allowNull : false, defaultValue: Sequelize.UUIDV1, primaryKey: true },
        createDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
        quantity: { type: Sequelize.INTEGER, allowNull: false},
        portfolio : { type: Sequelize.UUID, allowNull : false },
        investment : { type : Sequelize.UUID, allowNull : false }
    });

    return ebp_i;
};