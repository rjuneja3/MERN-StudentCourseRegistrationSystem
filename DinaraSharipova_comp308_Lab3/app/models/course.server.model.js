const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    courseCode: {
        type: String,
        required: 'Course code is required',
        trim: true,
        default: '',
        min:3,
        max: 40
    },
    courseName: {
        type: String,
        trim: true,
        min:5,
        max:40,
        default: '',
        required: 'Course Name is required'
    },
    section: {
        type: String,
        trim: true,
        default: '',
        required: 'Section is required'
    },
    semester: {
        type: Number,
        default: 1,
        required: 'Semester is required'
    },
    studentEntity: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
});
mongoose.model('Course', CourseSchema);
