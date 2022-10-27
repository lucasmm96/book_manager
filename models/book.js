const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Book = sequelize.define('book', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	title: Sequelize.STRING,
	author: Sequelize.STRING,
	added_at: Sequelize.DATE,
	finished_at: Sequelize.DATE,
	score: Sequelize.DOUBLE,
	status: Sequelize.STRING,
});

module.exports = Book;
