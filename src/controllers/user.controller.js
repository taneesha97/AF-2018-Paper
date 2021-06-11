const Users = require('../models/user.model');
const mongo = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;

//Simple User Adding method.
const createUser = async (req, res) => {
    if(req.body){
        const user = new Users(req.body);
        user.save()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                res.status(500).send({error: error.message});
            });
    }
}

//Simple User fetching method.
const GetAll  = async(req, res) => {
    const user = await Users.find()
        .then(data => {res.status(200).send({user: data});})
        .catch(error => {res.status(500).send({ user: error});});
}

//Simple Updating method.
const UpdateUser = async (req, res) => {
    const result = Users.updateOne(
        { "_id": objectId(req.body._id)},
        { $set: {"firstName" : req.body.firstName}}
    )
        .then(data => {res.status(200).send({user: data});})
        .catch(error => {res.status(500).send({ user: error});})
}

//Simple Delete Method.
const DeleteUser = async (req, res) => {
    const deleted = Users.deleteOne(
        {"_id": objectId(req.body._id)},
    )
        .then(data => {res.status(200).send({user: data});})
        .catch(error => {res.status(500).send({ user: error});})
}

module.exports = {
    createUser,
    GetAll,
    UpdateUser,
    DeleteUser
};
