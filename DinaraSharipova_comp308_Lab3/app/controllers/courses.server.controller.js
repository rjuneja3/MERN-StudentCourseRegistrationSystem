const mongoose = require('mongoose');
const Course = mongoose.model('Course');
const Student = require('mongoose').model('Student');


function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.create = function (req, res) {
    const course = new Course();
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;

    const studentEntity = new Student();
    console.log(req.body)
    Student.findOne({studentNumber: req.body.studentNumber}, (err, student) => {

        if (err) { return getErrorMessage(err); }
        req.id = student._id;
        console.log('student._id',req.id);

	
    }).then( function () 
    {
        course.studentEntity = req.id
        console.log('req.student._id',req.id);

        course.save((err) => {
            if (err) {
                console.log('error', getErrorMessage(err))

                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(course);
            }
        });
    
    });
};

// LIST ALL COURSES
exports.list = function (req, res) {
    Course.find().sort('-created').populate('studentEntity', 'firstName lastName fullName').exec((err, courses) => {
if (err) {
        return res.status(400).send({
            message: getErrorMessage(err)
        });
    } else {
        res.status(200).json(courses);
    }
});
};
//FOR A SEPARATE PAGE OF THE COURSE
exports.courseByID = function (req, res, next) {
    var id = req.params.courseId;
    Course.findById(id).exec((err, course) => {
      if (err) return next(err);
      if (!course) return next(new Error("Failed to load course " + id));
      req.course = course;
      console.log("in courseId:", req.course);
      next();
    });
  };
// FIND COURSE BY ITS UNIQUE CODE
exports.courseByCode = function (req, res, next) {
    var coureCode = req.params.courseCode;
    Course.findOne({ courseCode: coureCode }, (err, course) => {
      if (!course) { return next(new Error("Failed to load course"));
      } else {
        req.course = course;
        console.log('in courseByCode:', req.course)
        next();
      }
    });
  };

// LIST COURSES BY A STUDENT
exports.coursesByStudent = function (req, res) {
    var studentEntity = new Student();
    Student.findOne(
      { studentNumber: req.params.studentNumber },
      (err, student) => {
        studentEntity._id = student._id;
      }
    ).then(function () {
      Course.find({ studentEntity: studentEntity._id })
        .populate("studentEntity")
        .exec((err, courses) => {
          if (err) {
            return res.status(400).send({
              message: getErrorMessage(err),
            });
          } else {
            res.status(200).json(courses);
          }
        });
    });
  };

// LIST ALL STUDENTS IN A COURSE
exports.courseAllStudents = function (req, res) {
    var courseCode = req.params.courseCode;
    Course.find({ courseCode: courseCode })
      .populate("studentEntity")
      .exec((err, students) => {
        if (err) {
          return res.status(400).send({
            message: getErrorMessage(err),
          });
        } else {
          res.status(200).json(students);
        }
      });
  };
  

exports.read = function (req, res) {
    res.status(200).json(req.course);
};
//
exports.update = function (req, res) {
    console.log('in update:', req.course)
    const course = req.course;
    course.courseCode = req.body.courseCode;
    course.courseName = req.body.courseName;
    course.section = req.body.section;
    course.semester = req.body.semester;
    course.save((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(course);
        }
    });
};
//
exports.delete = function (req, res) {
    const student = req.student;
    student.remove((err) => {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.status(200).json(student);
        }
    });
};
//The hasAuthorization() middleware uses the req.article and req.user objects
//to verify that the current user is the creator of the current article
exports.hasAuthorization = function (req, res, next) {
    console.log('in hasAuthorization - creator: ',req.student.studentEntity)
    console.log('in hasAuthorization - user: ',req.id)
    //console.log('in hasAuthorization - user: ',req.user._id)


    if (req.course.studentEntity.id !== req.id) {
        return res.status(403).send({
            message: 'Student is not authorized'
        });
    }
    next();
};
