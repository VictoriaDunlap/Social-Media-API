const { Schema, model } = require('mongoose')
const User = require('./User')
const mongoose = require('mongoose')

const reactionSchema = new Schema({
    // reactionId: {
    //     type: Schema.Types.ObjectID, 
    //     default: () => new Types.ObjectId(),
    // }, 
    reactionBody: {
        type: String, 
        required: true, 
        min: 1,
        max: [280, 'Max characters reached']
    }, 
    username: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'User'
        },
    ], 
    createdAt: { 
        type: Date, 
        default: Date.now(),
    },

})

const thoughtSchema = new Schema( 
    {
        // thoughtId: {
        //     type: Schema.Types.ObjectID, 
        //     default: () => new Types.ObjectId(),
        // },
        thoughtText: {
            type: String, 
            required: true,
            min: 1,
            max: [280, 'Max characters reached']
        },
        createdAt: {
            type: Date, 
            default: Date.now(),
            get: (date) => timeSince(date)
        },
        // username.
        username: [
            { 
              type: Schema.Types.ObjectId, 
              ref: 'User'
            },
        ],
        reactions: [
            { 
                type: Schema.Types.ObjectId, 
                ref: 'Thought'
            },
        ]
    }, 
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

//retrieves the length of the thought's reactions array field on query
thoughtSchema
.virtual('reactionCount')
.get(function() {
    return this.reactions.length
})

const Thought = mongoose.model('Thought', thoughtSchema)

module.exports = { Thought, thoughtSchema }