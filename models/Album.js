/**
 * Album model
 */

module.exports = (bookshelf) => {
    return bookshelf.model('Album', {
	    tableName: 'albums',
        photos() {
            return this.hasMany('Photo')
        },
        user() {
            return this.belongsToMany('User');
        }
    }, {
            fetchById(id, fetchOptions = {}) {
                return new this({ id }).fetch(fetchOptions);
            },
        });
    }