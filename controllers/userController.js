const { User, Thought } = require('../models')

module.exports = {

    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err))
    },

    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) => !user ? res.status(404).json({ message: "No user with this ID" })
        : res.json(user))
    }
}