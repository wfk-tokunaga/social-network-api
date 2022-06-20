const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
// Thought
// thoughtText
// String
// Required
// Must be between 1 and 280 characters
// createdAt
// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query
// username (The user that created this thought)
// String
// Required
// reactions (These are like replies)
// Array of nested documents created with the reactionSchema
// Schema Settings
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    }
});

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// Reaction (SCHEMA ONLY)
// reactionId
// Use Mongoose's ObjectId data type
// Default value is set to a new ObjectId
// reactionBody
// String
// Required
// 280 character maximum
// username
// String
// Required
// createdAt
// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query

const ReactionSchema = new Schema({
    commentId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

const Thought = model('Thought', UserSchema);
module.exports = Thought;