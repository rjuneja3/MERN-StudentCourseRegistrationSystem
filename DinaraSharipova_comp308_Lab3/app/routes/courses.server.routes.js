// NEEDS CHANGES!
////////
const students = require('../../app/controllers/students.server.controller');
const courses = require('../../app/controllers/courses.server.controller');
//
module.exports = function (app) {
        app.route('/courses')
            .get(courses.list)
            .post(students.requiresLogin, courses.create);
        //
        
        app.route('/courses/:courseId')
            .get(courses.read)
            .put(students.requiresLogin, courses.hasAuthorization, courses.
                update)
            .delete(students.requiresLogin, courses.hasAuthorization, courses.
                delete);
        //
        app.param('courseId', courses.courseByID);

        app.route('/courses_by_student/:studentNumber').get(courses.read); // Courses taken by a student
        app.param('studentNumber',courses.coursesByStudent);
        
        app.route('/courses_all_students/:courseCode').get(courses.read); // All students of the course
        app.param('courseCode', courses.courseAllStudents);

      
};
