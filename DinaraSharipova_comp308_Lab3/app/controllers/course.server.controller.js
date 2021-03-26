const mongoose = require("mongoose");
const Course = mongoose.model("Course");
const Student = require("mongoose").model("Student");

//
function getErrorMessage(err) {
  if (err.errors) {
    for (let errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return "Unknown server error";
  }
}
//
exports.create = function (req, res) {
  const course = new Course();
  course.courseName = req.body.courseName;
  course.courseCode = req.body.courseCode;
  course.section = req.body.section;
  course.semester = req.body.semester;
  //course.studentEnrolled = req.body.studentNumber;
  const stu = new Student();
  console.log("body: " + req.body);
  //
  //
  Student.findOne(
    { studentNumber: req.body.studentEnrolled },
    (err, student) => {
      if (err) {
        return getErrorMessage(err);
      }
      //
      console.log(student);
      stu._id = student._id;
      req.id = student._id;
      console.log("student._id", req.id);
    }
  ).then(function () {
    course.studentEnrolled = stu._id;
    console.log("req.student._id", req.id);

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
//
exports.list = function (req, res) {
  Course.find()
    .sort("-created")
    .populate("studentEnrolled", "firstName lastName fullName")
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

exports.coursesTakenByStudent = function (req, res) {
  //var ObjectId = mongoose.Types.ObjectId;
  //var studentId = new ObjectId(req.params.studentId);
  //console.log("studentId: " + studentId);
  console.log('in courses taken by student, Student Id : '+req.params.studentId);
  var st = new Student();
  Student.findOne(
    { studentNumber: req.params.studentId },
    (err, student) => {
      st._id = student._id;
      console.log('student Id : '+st._id);
    }
  ).then(function () {
    Course.find({ studentEnrolled: st._id })
      .populate("studentEnrolled")
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
    .populate("studentEnrolled")
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

//
exports.courseById = function (req, res, next) {
  var id = req.params.courseId;
  Course.findById(id).exec((err, course) => {
    if (err) return next(err);
    if (!course) return next(new Error("Failed to load course " + id));
    req.course = course;
    console.log("in courseByStudentId:", req.course);
    next();
  });
};
//
exports.read = function (req, res) {
  res.status(200).json(req.course);
};
//

exports.update = function (req, res) {
  console.log("in update:", req.course);
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
            console.log("Updated Success: "+crse);
			res.json(crse);
		}
    });
};
//
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
//The hasAuthorization() middleware uses the req.course and req.user objects
//to verify that the current user is the studentEnrolled of the current course
exports.hasAuthorization = function (req, res, next) {
  console.log(
    "in hasAuthorization - studentEnrolled: ",
    req.course.studentEnrolled
  );
  const stu = new Student();
  Student.findById(req.course.studentEnrolled).exec((err,student)=>{
    if (err) return next(err);
    if (!student) return next(new Error("Failed to load student " + req.course.courseEnrolled));
    stu.studentNumber = student.studentNumber;
    stu._id = student._id;
    console.log("fetched Id : "+ stu._id);
  });
  console.log("in hasAuthorization - student: ", stu._id);
  console.log('in hasAuthorization - user: ',req.course.studentEnrolled._id)

  if (req.course.studentEnrolled !== req.course.studentEnrolled) {
    return res.status(403).send({
      message: "User is not authorized",
    });
  }
  next();
};
