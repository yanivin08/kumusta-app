const { modelNames } = require("mongoose");

module.exports = {
    mongoURI: "mongodb://yanivin08:masayahin08@cluster0-shard-00-00-lbefq.mongodb.net:27017,cluster0-shard-00-01-lbefq.mongodb.net:27017,cluster0-shard-00-02-lbefq.mongodb.net:27017/kumusta?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
    ACCESS_TOKEN_SECRET: "bee016c055f21f1e3d756115328b67b07f3b45242eb52db445fe3762882dbb69",
    REFRESH_TOKEN_SECRET: "a6957d0f5f760eef7d890ff57c94c3afc013f046d83a3b291160df6903d5ec4b"
}

// Change secret key for access tokens by
// require('crypto').randomBytes(<insert_number>).toString('hex')
// Create .env file manually in production
// These secret tokens are placed here for dev only