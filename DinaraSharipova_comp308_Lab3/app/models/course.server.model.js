const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseSchema = new Schema({
    courseCode: {
        type: String,
        required: 'Course code is mandatory'
    },
    courseName: {
        type: String,
        required: 'Course Name is mandatory',
        default: '',
        trim: true
    },
    section: {
        type: String, 
        default: '',
        required: 'Section is mandatory',
        trim: true
    },
    semester: {
        type: String, 
        required: 'Semester is mandatory',
        default: '',
        trim: true
    },
    studentEntity: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }
});

// CourseSchema.index({ 'courseCode': 1, 'studentEntity': 1 }, { unique: true });
mongoose.model('Course', CourseSchema);
