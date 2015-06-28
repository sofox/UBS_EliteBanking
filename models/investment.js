"use strict";

module.exports = function(sequelize, DataTypes) {
	var Sequelize = require('sequelize');
    var ebinvestment = sequelize.define("ebinvestment", {
    	id : { type : Sequelize.UUID, allowNull : false, defaultValue: Sequelize.UUIDV1, primaryKey: true },
        name: { type: Sequelize.STRING, allowNull : false },
        code: {type: Sequelize.STRING, allowNull: false},
    	type: { type : Sequelize.INTEGER}
    });

    return ebinvestment;
};