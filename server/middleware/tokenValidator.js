const jwt = require('jsonwebtoken');
const { failure } = require('../utils/responseWrapper');

module.exports = async (req, res, next) => {
    // check token present in header or not
    const token = req.headers || req.headers.authorization || req.headers.authorization.startsWith('Bearer');
    if (!token) {
        return res.send(failure(401, "Access Denied"));
    }
    try {
        // 0 for authentication type here Bearer and 1 is for token
        const accessToken = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_PRIVATE_KEY);
        req._id = decoded._id;
        next();
    } catch (error) {
        console.log('middleware error',error);
        return res.send(failure(401, "Invalid access Key"));
    }
}