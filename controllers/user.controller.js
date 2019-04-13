const mongoose = require('mongoose')
const passport = require('passport');
const User = require('../models/user.model')

module.exports.register = (req, res, next) => {
    const user = new User(req.body)
    user.save((err, doc) => {
        if (!err) {
            res.status(201).send(doc)
        } else {
            if (err.code == 11000) {
                res.status(422).send(err.errmsg)
            } else {
                return next(err)
            }
        }
    })
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}