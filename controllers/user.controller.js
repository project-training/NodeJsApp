const mongoose = require('mongoose')
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