const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    saltSecret: String
})

module.exports = mongoose.model('User', UserSchema, 'users')