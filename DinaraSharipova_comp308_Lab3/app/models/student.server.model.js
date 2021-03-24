const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;

var StudentSchema = new Schema({
	firstName: {
		type: String,
		required: 'First Name is required',
		max: 40
	},
	lastName: {
		type: String,
		required: 'Last Name is required',
		max: 40
	},
	studentNumber: {
		type: Number,
		required: 'Student Number is required',
		unique: true,
		max: 10000000,
		trim: true
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		// Validate the email format
		match: [/.+\@.+\..+/, "Please fill a valid email address"]
	},
	password: {
		type: String,
		required: 'Password is required',
		validate: [
			(password) => password && password.length > 6,
			'Password should be longer'
		]
	},
	address:{
		type: String,
		required: 'Address is required',
		max: 100
	},
	city:{
		type: String,
		required: 'City is required',
		max: 50
	},
	phoneNumber:{
		type: Number,
		required: 'Phone Number is required',
		max: 10000000000,
		min:1000000000
	},
	program:{
		type: String,
		required: 'Program is required',
		max: 100
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

// Create an instance method for authenticating student
StudentSchema.methods.authenticate = function(password) {
	//compare the hashed password of the database 
	//with the hashed version of the password the student enters
	return this.password === bcrypt.hashSync(password, saltRounds);
};



StudentSchema.set('toJSON', {
	getters: true,
	virtuals: true
});


mongoose.model('Student', StudentSchema);