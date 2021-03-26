const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    courseCode: {
        type: String,
        required: 'course code is required'
    },
    courseName: {
        type: String,
        default: '',
        trim: true,
        required: 'Couse Name cannot be blank'
    },
    section: {
        type: String, 
        default: '',
        required: 'Section is required',
        trim: true
    },
    semester: {
        type: String, 
        default: '',
        required: 'Semester is required',
        trim: true
    },
    studentEnrolled: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }
});
mongoose.model('Course', CourseSchema);
