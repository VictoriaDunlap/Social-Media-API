const { Schema, model } = require('mongoose')

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: Schema.Types.ObjectID, 
        default: () => new Types.ObjectId(),
    }, 
    reactionBody: {
        type: String, 
        required: true, 
        min: 1,
        max: [280, 'Max characters reached']
    }, 
    username: {
        type: String, 
        required: true,
    }, 
    createdAt: { 
        type: Date, 
        default: Date.now(),
    }
})

const thoughtSchema = new Schema( 
    {
        thoughtId: {
            type: Schema.Types.ObjectID, 
            default: () => new Types.ObjectId(),
        },
        thoughtText: {
            type: String, 
            required: true,
            min: 1,
            max: [280, 'Max characters reached']
        },
        createdAt: {
            type: Date, 
            default: Date.now(),
            // Use a getter method to format the timestamp on query
        },
        username: { // the one that created the thought -- so ink here
            type: String, 
            required: true,
        },
        reactions: [reactionSchema]
    }, 
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

thoughtSchema.virtual('reactionCount').get(function() {
    //retrieves the length of the thought's reactions array field on query
})

const Thought = mongoose.model('Thought', thoughtSchema)

module.exports = thoughtSchema