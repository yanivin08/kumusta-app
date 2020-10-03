const { sign } = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../config/keys');

// Usage: Just pass the user ID/name as the payload
// i.e. const <name> = create_access_token(<user_id>)
function create_access_token(userId) {
    // Add other token options as you see fit
    // Check https://www.npmjs.com/package/jsonwebtoken for more
    return sign({ userId }, ACCESS_TOKEN_SECRET, {
        expiresIn: "15m"
    });
}

function refresh_access_token(userId) {
    return sign({ userId }, REFRESH_TOKEN_SECRET, {
        expiresIn: "1d"
    });
}

module.exports = {
    create_access_token,
    refresh_access_token
}