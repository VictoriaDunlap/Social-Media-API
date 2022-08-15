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
    },

    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
        console.log(err)
        return res.status(500).json(err)}
    )},

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((user) => 
        !user 
            ? res.status(404).json({ message: 'No user with this id' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err))
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) => 
        !user
            ? res.status(404).json({ message: 'No user with this id' })
            : Thought.findOneAndUpdate(
                { username: req.params.userId }, 
                { $pull: { username: req.params.userId }}, 
                { new: true }
            )
        )
        .then((user) => 
        !user
            ? res.json(404).json({
                message: 'User deleted, but no thoughts were found'})
            : res.json({ message: 'Student successfully deleted' })
        )
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    }
}