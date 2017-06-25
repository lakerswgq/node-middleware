const url = require("url");

module.exports = function (req, res, next){
    try {
        let query = url.parse(req.url, true).query;
        req.query = query;
        next();
    } catch (error) {
        next(error);
    }
}