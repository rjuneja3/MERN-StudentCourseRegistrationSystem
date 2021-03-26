const mongoose = require("mongoose");
const Course = mongoose.model("Course");
const Student = require("mongoose").model("Student");

function getErrorMessage(err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return "Unknown server error";
  }
}
exports.create = function (req, res) {
  const course = new Course();
  course.courseName = req.body.courseName;
  course.courseCode = req.body.courseCode;
  course.section = req.body.section;
  course.semester = req.body.semester;
  const stud_new = new Student();
  Student.findOne(
    { studentNumber: req.body.studentEntity },
    (err, student) => {
      if (err) {
        return getErrorMessage(err);
      }
      stud_new._id = student._id;
      req.id = student._id;
    }
  ).then(function () {
    course.studentEntity = stud_new._id;
    course.save((err) => {
      if (err) {
        console.log("error", getErrorMessage(err));

        return res.status(400).send({
          message: getErrorMessage(err),
        });
      } else {
        res.status(200).json(course);
      }
    });
  });
};

exports.list = function (req, res) {
  Course.find()
    .sort("-created")
    .populate("studentEntity", "firstName lastName fullName")
    .exec((err, courses) => {
      if (err) {
        return res.status(400).send({
          message: getErrorMessage(err),
        });
      } else {
        res.status(200).json(courses);
      }
    });
};

exports.coursesOfStudent = function (req, res) {
  var st = new Student();
  Student.findOne(
    { studentNumber: req.params.studentId },
    (err, student) => {
      st._id = student._id;

    }
  ).then(function () {
    Course.find({ studentEntity: st._id })
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

exports.studentsInCourse = function (req, res) {
  var code = req.params.courseCode;
  console.log(code);
  Course.find({ courseCode: code })
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

exports.courseByCourseCode = function (req, res, next) {
  var code = req.params.courseCode;
  Course.findOne({ courseCode: code }, (err, course) => {
    if (!course) {
      return next(new Error("failed to load course" + courseCode));
    } else {
      req.course = course;
      console.log("Course found :" + course);
      next();
    }
  });
};

exports.courseById = function (req, res, next) {
  var id = req.params.courseId;
  Course.findById(id).exec((err, course) => {
    if (err) return next(err);
    if (!course) return next(new Error("Failed to load course " + id));
    req.course = course;
    next();
  });
};
//
exports.read = function (req, res) {
  res.status(200).json(req.course);
};
//

exports.update = function (req, res) {
  const course = req.course;
  course.courseName = req.body.courseName;
  course.courseCode = req.body.courseCode;
  course.section = req.body.section;
  course.semester = req.body.semester;
  Course.findByIdAndUpdate(course._id,
    req.body, function(err,crse){
        if(err){
			console.log(err);
			return next(err);
		}
		else{
			res.json(crse);
		}
    });
};

exports.delete = function (req, res) {
  const course = req.course;
  course.remove((err) => {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err),
      });
    } else {
      res.status(200).json(course);
    }
  });
};

exports.hasAuthorization = function (req, res, next) {
  const stu = new Student();
  Student.findById(req.course.studentEntity).exec((err,student)=>{
    if (err) return next(err);
    if (!student) return next(new Error("Failed to load student " + req.course.studentEntity));
    stu.studentNumber = student.studentNumber;
    stu._id = student._id;
    console.log("fetched Id : "+ stu._id);
  });

  if (req.course.studentEntity !== req.course.studentEntity) {
    return res.status(403).send({
      message: "Student is not authorized",
    });
  }
  next();
};
