const { Schema, model } = require('mongoose');

// User
// username
// String
// Unique
// Required
// Trimmed
// email
// String
// Required
// Unique
// Must match a valid email address (look into Mongoose's matching validation)
// thoughts
// Array of _id values referencing the Thought model
// friends
// Array of _id values referencing the User model (self-reference)

var validateEmail = function(email) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email)
};

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const User = model('User', UserSchema);
module.exports = User;