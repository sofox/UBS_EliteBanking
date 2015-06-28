"use strict";

module.exports = function(sequelize, DataTypes) {
	var Sequelize = require('sequelize');
    var ebcustomer = sequelize.define("ebcustomer", {
    	id : { type : Sequelize.UUID, allowNull : false, defaultValue: Sequelize.UUIDV1, primaryKey: true },
        createDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
        name: { type: Sequelize.STRING, allowNull : false },
        email : { type: Sequelize.STRING, allowNull : false },
        password : { type : Sequelize.STRING, allowNull : false },
        token : { type : Sequelize.TEXT },
        balance : { type : Sequelize.FLOAT, allowNull : false, defaultValue : 0}
    });

    return ebcustomer;
};