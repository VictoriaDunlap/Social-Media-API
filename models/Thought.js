const { Schema, model } = require('mongoose')

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
        userName: { // the one that created the thought -- so ink here
            type: String, 
            required: true,
        },
        reactions: { // replies
            // Array of nested documents created with the reactionSchema
        }
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