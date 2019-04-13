const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema

let UserSchema = new Schema({
    userName: {
        type: String,
        required: 'Username can\'t be empty',
        unique: true
    },
    firstName: {
        type: String,
        required: 'Firstname can\'t be empty'
    },
    lastName: {
        type: String,
        required: 'Lastname can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
    saltSecret: String
})

// Custom validation for email
UserSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Encrypt for password
UserSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash
            this.saltSecret = salt
            next()
        })
    })
})

UserSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        });
}

module.exports = mongoose.model('User', UserSchema, 'users')