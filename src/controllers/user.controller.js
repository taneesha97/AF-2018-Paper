const Users = require('../models/user.model');

//Simple User Adding method.
const createUser = async (req, res) => {
    if(req.body){
        const user = new Users(req.body);
        user.save()
            .then(data => {
                res.status(200).send({data: data});
            })
            .catch(error => {
                res.status(500).send({error: error.message});
            });
    }
}

//Simple User fetching method.
const GetAll  = async(req, res) => {
    const user = await Users.find()
        .then(data => {res.status(200).send({ subjects: data});})
        .catch(error => {res.status(500).send({ subjects: error});});
}

module.exports = {
    createUser,
    GetAll
};
