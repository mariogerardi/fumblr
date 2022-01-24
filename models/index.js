require('../config/db.connection');

module.exports = {
    //these are the exports for all models
    Content: require('./content_model.js'),
    User: require('./user_model.js'),
    Blog: require('./blog_model'),
    Assets: require('./asset_model')
}