const { User } = require('../models')
const { Thought,thoughtSchema } = require('../models/Thought')

module.exports = {

    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err))
    },

    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .populate({ path: 'reactions', select: '-__v'})
        // .select('-__v')
        .then((thoughts) => !thoughts ? res.status(404).json({ message: "No thoughts with this ID" })
        : res.json(thoughts))
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((thoughts) => {
            User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: thought._id }}
            )
        })
        .then((user) => 
        !user 
        ? res.status(404).json({ message: "No users with this ID" }) 
        : res.json(user)
        .catch((err) => {
        console.log(err)
        return res.status(500).json(err)}
    ))},

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thoughts) => 
        !thoughts 
            ? res.status(404).json({ message: 'No thoughts with this id' })
            : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err))
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thoughts) => {
            User.findOneAndUpdate(
                { _id: body.userId },
                { $pull: { thoughts: thought._id }}
            )
            })
            .then((user) => 
            !user 
            ? res.status(404).json({ message: "No users with this ID" })
            : res.json(user)
        .then((thoughts) => 
        !thoughts
            ? res.status(404).json({ message: 'No thoughts with this id' })
            : User.deleteMany(
                { _id: { $in: thoughts.user }}
            )
        )
        .then(() => res.json({ message: 'Thoughts deleted!' }))
        .catch((err) => res.status(500).json(err))
    )},

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body} },
            { runValidators: true, new: true }
        )
        .then((thoughts) => 
        !thoughts 
            ? res.status(404).json({ message: 'No thought with this id' })
            : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err))
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: req.body} },
            { runValidators: true, new: true }
        )
        .then((thoughts) => 
        !thoughts 
            ? res.status(404).json({ message: 'No thought with this id' })
            : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err))
    }
}