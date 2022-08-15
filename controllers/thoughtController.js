const { User, Thought } = require('../models')

module.exports = {

    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err))
    },

    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thoughts) => !thoughts ? res.status(404).json({ message: "No thoughts with this ID" })
        : res.json(thoughts))
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((thoughts) => res.json(thoughts))
        .catch((err) => {
        console.log(err)
        return res.status(500).json(err)}
    )},

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
        .then((thoughts) => 
        !thoughts
            ? res.status(404).json({ message: 'No thoughts with this id' })
            : User.deleteMany(
                { _id: { $in: thoughts.user }}
            )
        )
        .then(() => res.json({ message: 'Thoughts deleted!' }))
        .catch((err) => res.status(500).json(err));
    }
}