const { verify } = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../config/keys');

// Usage: On POST event, in the chat room page:
// Pass the request headers directly in the function
// i.e. const <name> = is_authorized(<request_header>)
function is_authorized(req) {
    const authorization = req.headers['authorization']; // Get authorization header
    
    // Check if user is signed in
    if (!authorization) throw new Error("You are not logged in");

    // Authorization header contain "Bearer <access_token>"
    // We split that header and take the access token
    const token = authorization.split(' ')[1];
    const { id } = verify(token, ACCESS_TOKEN_SECRET); // Compare and verify header access token to our secret token

    return id;
}

module.exports = {
    is_authorized
}