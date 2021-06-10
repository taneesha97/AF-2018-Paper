const Course = require('../models/course.model');
const Subject = require('../models/subjet.model');

//Add course
const createCourse = async (req, res) => {
    if(req.body){
        const course = new Course(req.body);
        await course.save()
        .then(data => {
            res.status(200).send({data: data});
        }).catch(error => {
            res.status(500).send({error: error.message});
        });
    }
}

//get all courses
const getCourse = async (req, res) => {
    await Course.find({}).populate('subjects', 'name description amount')
    .then(data => {
            res.status(200).send({ data: data });
        })
            .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

//get subject for given course
const getSubjectsForCourse = async (req, res) => {
    if(req.params && req.params.id){
        await Course.findById(req.params.id)
        .populate('subjects', '_id name description amount')
        .then(data => {
            res.status(200).send({ subjects: data.subjects });
        }).catch(error => {
            res.status(500).send({error: error.message});
            // console.log(error);
        });
    }
}

//calculate course fee
const calculateAmount = async (req, res) => {
    if (req.params && req.params.id) {
        let course = await Course.findById(req.params.id).populate('subjects', 'amount')
        let totalAmount = 0;

        if (course.subjects.length > 0) {
            course.subjects.map((subject) => {
                totalAmount = totalAmount + subject.amount;
                console.log(totalAmount);
            });
        }
        res.status(200).send({totalAmount: totalAmount});
    }
}

//select * from subject where amount >= 3000
// const getSubjects = async(req, res) => {
//     await Subject.find({'amount': {'$lte': 3000}})
//     .then(response => {
//         res.status(200).send({data: response});
//     })
//     .catch(error => {
//         res.status(500).send({error: error.message});
//     });
// }

module.exports = {
    createCourse,
    getCourse,
    getSubjectsForCourse,
    calculateAmount
    // getSubjects
};

