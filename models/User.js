const { Schema, Types, model } = require('mongoose')
const thoughtSchema = require('./Thought')


const userSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectID, 
            default: () => new Types.ObjectId(),
        },
        username: {
            type: String, 
            unique: true, 
            required: true, 
            trimmed: true,
        },
        email: {
            type: String, 
            unique: true, 
            required: true, 
        },
        thoughts: [thoughtSchema]
        // friends:Array of _id values referencing the User model (self-reference)
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

userSchema.virtual('friendCount').get(function() {
    // returns the length of the user's friends array on field query
})

const User = mongoose.model('User', userSchema)

module.exports = User