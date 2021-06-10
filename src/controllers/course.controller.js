//Insert the Schema, Model Class
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
const getAllCourses = async (req, res) => {
	await Course.find({}).populate("subjects", 'name description amount')
		.then(data => {
			res.status(200).send({data: data });
		})
		.catch(error => {
			res.status(500).send({error: error });
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
const calculateAmount = async (req, res) => {
	if (req.params && req.params.id) {
		const course = await Course.findById(req.params.id)
			.populate("subjects", 'name description amount');
		let total = 0;
		if (course.subjects.length > 0) {
			course.subjects.map((subject) => {
				total += subject.amount;
			})

		}
		res.status(200).send({total: total});

	}
}


/*
* Simple Database Methods.
* */
//Simple Insert method.




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
