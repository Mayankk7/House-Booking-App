const mongoose = require("mongoose")

const TokenSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const TokenModel = mongoose.model("token", TokenSchema)

module.exports = TokenModel