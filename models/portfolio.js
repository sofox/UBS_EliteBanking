"use strict";

module.exports = function(sequelize, DataTypes) {
	var Sequelize = require('sequelize');
    var ebportfolio = sequelize.define("ebportfolio", {
    	id : { type : Sequelize.UUID, allowNull : false, defaultValue: Sequelize.UUIDV1, primaryKey: true },
        createDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
        name: { type: Sequelize.STRING, defaultValue: 'New Portfolio' },
        account : { type: Sequelize.UUID, allowNull : false }
    });

    return ebportfolio;
};