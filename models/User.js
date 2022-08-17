const { Schema, model } = require('mongoose')
const { thoughtSchema,Thought } = require('./Thought')
const mongoose = require('mongoose')

const userSchema = new Schema(
    {
        // userId: {
        //     type: Schema.Types.ObjectID, 
        //     default: () => new Types.ObjectId(),
        // },
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
        thoughts: [  
        {   
            type: Schema.Types.ObjectId, 
            ref: 'Thought',
        },
        ],
        friends: [ 
        {   
            type: Schema.Types.ObjectId, 
            ref: 'User',
        },
    ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

userSchema
.virtual('friendCount')
.get(function() {
  return this.friends.length
})

const User = mongoose.model('User', userSchema)

module.exports = User