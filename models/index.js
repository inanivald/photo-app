const knex = require('knex')({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 3306,
		user: process.env.DB_USER || 'photoapp',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_NAME || 'photoapp',
	}
});

const bookshelf = require('bookshelf')(knex);

const Photo = require('./Photo')(bookshelf)
const Album = require('./Album')(bookshelf)
// const User = require('./User')(bookshelf)

module.exports = {
	bookshelf,
	Photo,
	Album,
	// User,
};