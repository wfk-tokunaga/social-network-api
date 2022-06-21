const { User, Thought } = require('../models');

const userController = {
    // GET all users
    getAllUsers(req, res) {
        console.log('=== getAllUsers ===');
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // GET a single user by its _id and populated thought and friend data
    getUserById({ params }, res) {
        console.log('=== getUserById ===');
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with that ID.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // POST a new user:
    createNewUser({ body }, res) {
        console.log('=== createNewUser ===');
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    // PUT to update a user by its _id
    updateUser({ params, body }, res) {
        console.log('=== updateUser ===');
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "No user found with that ID." });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // DELETE to remove user by its _id
    deleteUser({ params }, res) {
        console.log('===== deleteUser =====');
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    // BONUS: Remove a user's associated thoughts when deleted.

    // /api/users/:userId/friends/:friendId

    // POST to add a new friend to a user's friend list
    addFriend({ params }, res) {
        console.log('=== addFriend ===');
        User.findByIdAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId } }, { new: true, runValidators: true })
            .populate({
                path: 'friends',
                select: ('-__v')
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // DELETE to remove a friend from a user's friend list
    removeFriend({ params }, res) {
        console.log('=== removeFriend ===');
        User.findByIdAndUpdate({ _id: params.userId }, { $pull: { friends: params.friendId } }, { new: true, runValidators: true })
            .populate({
                path: 'friends',
                select: ('-__v')
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
}

module.exports = userController;