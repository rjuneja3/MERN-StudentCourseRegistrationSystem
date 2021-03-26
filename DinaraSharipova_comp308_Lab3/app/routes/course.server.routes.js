const students = require('../../app/controllers/student.server.controller');
const courses = require('../../app/controllers/course.server.controller');
//
module.exports = function (app) {
        app.route('/api/courses')
            .get(courses.list)
            //.post(courses.create);
            .post(students.requiresLogin, courses.create);
        //
        app.route('/api/courses/:courseId')
            .get(courses.read)
            .put(students.requiresLogin, courses.hasAuthorization, courses.
                update)
            //.put(courses.update)
            //.delete(courses.delete);
            .delete(students.requiresLogin, courses.hasAuthorization, courses.
                delete);
        //
        app.route('/api/coursesofstudent/:studentId')
            .get(courses.read);
        //
        app.route('/api/studentsincourse/:courseCode')
            .get(courses.read);
        //
        app.param('courseId', courses.courseById);
        app.param('courseCode', courses.studentsInCourse);
        //app.param('courseCode', courses.courseByCourseCode);
        app.param('studentId',courses.coursesTakenByStudent);
};
