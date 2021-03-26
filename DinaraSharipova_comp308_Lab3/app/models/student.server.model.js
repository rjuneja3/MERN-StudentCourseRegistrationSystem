// Load the module dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
//
// Define a new 'UserSchema'
var StudentSchema = new Schema({
    firstName: {
		type: String,
		max: 50,
		required: 'First Name is mandatory'
	},
	lastName: {
		type: String,
		max: 50,
		required: 'Last Name is mandatory'
	},
	email: {
		type: String,
		max:50,
		// Validate the email format
		match: [/.+\@.+\..+/, "Please fill a valid email address"]
	},
	studentNumber: {
		type: Number,
		unique: true,
		required: 'Student Number is mandatory',
	},
	password: {
		type: String,
		validate: [
			(password) => password && password.length > 6,
			'Password should be longer'
		]
	},
	program:{
		type: String,
		max:50,
		required: 'program is mandatory'
	},
	city:{
		type: String,
		max:30,
		required: 'City is mandatory'
	},
	address:{
		type: String,
		max:100,
		required: 'Address is mandatory'
	},
	
	phone:{
		type: String,
		max:15,
		required: 'Phone Number is required'

	}
});

// Set the 'fullname' virtual property
StudentSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	const splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

// Use a pre-save middleware to hash the password
// before saving it into database
StudentSchema.pre('save', function(next){
	//hash the password before saving it
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

// Create an instance method for authenticating user
StudentSchema.methods.authenticate = function(password) {
	//compare the hashed password of the database 
	//with the hashed version of the password the user enters
	return this.password === bcrypt.hashSync(password, saltRounds);
};


// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
StudentSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'User' model out of the 'UserSchema'
mongoose.model('Student', StudentSchema);