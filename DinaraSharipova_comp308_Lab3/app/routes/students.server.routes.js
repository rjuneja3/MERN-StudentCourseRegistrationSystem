var students = require('../../app/controllers/students.server.controller');
var express = require('express');
var router = express.Router();

module.exports = function (app) {
   
    app.get("/students",students.requiresLogin,students.list); 
    app.post('/', students.create);
   
	app.route('/students/:studentNumber')
    .get(students.read)
    .put(students.update)
    .delete(students.delete)

    app.param('studentNumber', students.StudentByNumber);
    //authenticate user
    app.post('/signin', students.authenticate);
    app.get('/signout', students.signout);
    app.get('/read_cookie', students.isSignedIn);

    //path to a protected page
	app.get('/welcome',students.welcome);
    
};

