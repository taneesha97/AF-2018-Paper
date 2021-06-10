const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {type:String, required:true, trim:true},
});

const Users = mongoose.model('users', UserSchema);
module.exports = Users;
