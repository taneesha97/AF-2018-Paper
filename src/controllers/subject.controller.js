const Subject = require('../models/subjet.model');

const createSubject = async (req, res) => {
    console.log("before if1");
    if(req.body){
        console.log("inside if2");
        const subject = new Subject(req.body);
        subject.save()
            .then(data => {
            res.status(200).send({data: data});
            // res.json(data)
        })
            .catch(error => {
            res.status(500).send({error: error.message});
            // console.log(error);
        });
    }
}

module.exports = {
    createSubject
};