const Course = require('../models/course.model');

//Create course.
const createCourse = async (req, res) => {
	if(req.body){
		const course = new Course(req.body);
		await course.save().then(data => {
			res.status(200).send({data: data});
		}).catch(error => {
			res.status(500).send({error: error.message});
		})
	}
}

//populate function use to get data from other claseses.
const getAllCourses = async(req, res)=> {
	await Course.findById({}).populate('subjects', 'name discription amount')
	.then(data => {
		res.status(200).send({data: data});
	}).catch(error => {
		res.status(500).send({error: error.message});
	})
}

//Find a Specific Document.
const getSubjectForCourse = async (req, res) => {
	if(req.params && req.params.id){
		const course = await Course.findById(req.params.id)
		.populate('subjects', 'name description amount')
		.then(data => {
			res.status(200).send({ subjects: data});
		});
	}
}

//Reuse the above method and calculate the amount.
const calculateAmount = async(req, res) => {
	if(req.params && req.params.id){
		const course = await Course.findById(req.params.id);
		let totalAmount = 0;
		if(course.subjects.length > 0){
			course.subjects.map((subject) => {
				totalAmount+=subject.amount;
			});
		}
		res.status(200).send({totalAmount: totalAmount});
	}
}

//Delete Course a Course web provide the Id.

//Simple Get All method.
const GetAll  = async(req, res) => {
	const course = await Course.find()
		.then(data => {res.status(200).send({ subjects: data});})
		.catch(error => {res.status(500).send({ subjects: error});});
}
//Simple Update Method.


module.exports = {
	createCourse,
	getAllCourses,
	getSubjectForCourse,
	calculateAmount,
	GetAll
}; 
