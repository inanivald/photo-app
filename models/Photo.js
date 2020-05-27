/**
 * Book model
 */

module.exports = (bookshelf) => {
	return bookshelf.model('Photo', {
		tableName: 'photos',
		author() {
			return this.belongsTo('Album');   
		},
	// 	users() {
	// 		return this.belongsToMany('User');
	// 	}
	// }, {
	// 	fetchById(id, fetchOptions = {}) {
	// 		return new this({ id }).fetch(fetchOptions);
	// 	},
	});
}
