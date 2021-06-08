const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const subjectAPI = require('./src/api/subject.api');
const courseAPI = require('./src/api/course.api');


dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {

    useCreateIndex: true,
    userNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error) => {
    if(error){
        console.log('Database Error: ' + error.message);
    }
});

mongoose.connection.once('open', ()=> {
    console.log('Database Synced');
});

app.route('/').get((req, res) => {
    res.send('SLIIT AF 2018 FINAl API');
});

app.use('/subject',subjectAPI());
app.use('/course',courseAPI());

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
});


