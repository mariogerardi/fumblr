require('../config/db.connection');

module.exports = {
    Content: require('./content_model.js'),
    User: require('./user_model.js'),
    Blog: require('./blog_model.js'),
    Asset: require('./asset_model.js')
}