const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const { join } = require("path");

const app = express();

const port = process.env.SERVER_PORT || 3001;

app.use(morgan("dev"));
app.use(helmet());
app.use(express.static(join(__dirname, "build")));

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-ocwjob8q.us.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: 'https://dev-ocwjob8q.us.auth0.com/api/v2/',
    issuer: [`https:/dev-ocwjob8q.us.auth0.com/`],
    algorithms: ['RS256']
});

app.get('/api/public', function(req, res) {
    console.log('public');
    res.send("public");
    res.json({
        message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    })
});

// This route needs authentication
app.get('/api/private', checkJwt, function(req, res) {
    res.json({
        message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));


