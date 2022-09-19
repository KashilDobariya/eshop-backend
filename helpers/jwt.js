const { expressJwt } = require("express-Jwt");

function authJwt () {
    const secret = process.env.secret;
    // const api = process.env.API_URL;
    expressJwt(
        {
            secret,
            algorithms: ["HS256"],
            // isRevoked: isRevoked,
        });
}

module.exports = authJwt;