
const Student = require('mongoose').model('Student');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey =config.secretKey;


const getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Student number already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (const errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};
exports.create = function (req, res, next) {
    var student = new Student(req.body);
    student.save(function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(student);
        }
    });
};
// LIST ALL STUDENTS
exports.list = function (req, res, next) {
    Student.find({}, function (err, students) {
        if (err) {
            return next(err);
        } else {
            res.json(students);
        }
    });
};

exports.read = function(req, res) {
	res.json(req.student);
};

exports.userByID = function (req, res, next, id) {
	Student.findOne({
        studentNumber: id
	}, (err, student) => {
		if (err) {
			return next(err);
		} else {
            req.student = student;
            console.log(student);
			next();
		}
	});
};

exports.updateStudent = function(req,res,next){
	console.log(req.body);
	Student.findOneAndUpdate({studentNumber: req.student.studentNumber},
		req.body,{useFindAndModify: false},function (err,student){
		if(err){
			console.log(err);
			return next(err);
		}
		else{
			res.json(student);
		}
	});
};

exports.deleteStudent = function(req,res,next){
	console.log(req.body);
	Student.findOneAndRemove(
		{studentNumber: req.student.studentNumber},
		req.body,
		function (err,student){
		if(err){
			console.log(err);
			return next(err);
		}
		else{
			res.json(student);
		}
	});
};


exports.authenticate = function(req, res, next) {
	const studentNumber = req.body.auth.studentNumber;
	const password  = req.body.auth.password;
	Student.findOne({studentNumber: studentNumber}, (err, student) => {
			if (err) {
				return next(err);
			} else {
			console.log(student);
			if(student != null){
				if(bcrypt.compareSync(password, student.password)) {
				
					const token = jwt.sign({ id: student._id, studentNumber: student.studentNumber }, jwtKey, 
						{algorithm: 'HS256', expiresIn: jwtExpirySeconds });
					console.log('token:', token)
					
					res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000,httpOnly: true});
					req.student=student;
					res.status(200).send({ screen: student.studentNumber, student: student});
					next()
				} else {
					res.json({status:"error", message: "Invalid Student Number or password",
					data:null});
				}
			}
			else{
				res.json({status:"error", message: "Invalid Student Number or password", data:null});
			}
			
			
		}
		
	});
};
//
// protected page uses the JWT token
exports.welcome = (req, res) => {
	// We can obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token
	console.log(token)
	// if the cookie is not set, return an unauthorized error
	if (!token) {
	  return res.status(401).end()
	}
  
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// if the error thrown is because the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
  
	// Finally, return the welcome message to the student, along with their
	// username given in the token
	// use back-quotes here
	res.send(`${payload.studentNumber}`)
 };
 //
 //sign out function in controller
//deletes the token on the client side by clearing the cookie named 'token'
exports.signout = (req, res) => {
	res.clearCookie("token")
	return res.status('200').json({message: "signed out"})
	// Redirect the student back to the main application page
	//res.redirect('/');
}
//check if the student is signed in
exports.isSignedIn = (req, res) => {
	// Obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token
	console.log(token)
	// if the cookie is not set, return 'auth'
	if (!token) {
	  return res.send({ screen: 'auth' }).end();
	}
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
  
	// Finally, token is ok, return the username given in the token
	res.status(200).send({ screen: payload.studentNumber });
}

//isAuthenticated() method to check whether a student is currently authenticated
exports.requiresLogin = function (req, res, next) {
    // Obtain the session token from the requests cookies,
	// which come with every request
	const token = req.cookies.token
	console.log(token)
	// if the cookie is not set, return an unauthorized error
	if (!token) {
	  return res.send({ screen: 'auth' }).end();
	}
	var payload;
	try {
	  // Parse the JWT string and store the result in `payload`.
	  // Note that we are passing the key in this method as well. This method will throw an error
	  // if the token is invalid (if it has expired according to the expiry time we set on sign in),
	  // or if the signature does not match
	  payload = jwt.verify(token, jwtKey)
	  console.log('in requiresLogin - payload:',payload)
	  req.studentNumber = payload.studentNumber;
	} catch (e) {
	  if (e instanceof jwt.JsonWebTokenError) {
		// if the error thrown is because the JWT is unauthorized, return a 401 error
		return res.status(401).end()
	  }
	  // otherwise, return a bad request error
	  return res.status(400).end()
	}
	// student is authenticated
	//call next function in line
    next();
};