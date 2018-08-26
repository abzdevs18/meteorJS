import { Template } from 'meteor/templating';
// import { movieCollection } from '../api/movies.js';

import './login.html';

	Template.login.events({
		'submit form':function(event){
			event.preventDefault();
			//below variable targets the inputs from the form
			var username = trimInput(event.target.loginUsername.value);
			var password = trimInput(event.target.loginPassword.value);
			if (isEmail(username) && isValidPassword(password)) {
				Meteor.loginWithPassword(username,password,function(err){
					if (err) {
						Bert.alert(err.reason,"danger","growl-top-right");
						return false;
					}else{
						Router.go('/');
						Bert.alert("Login SUCCESSFUL", "success","growl-top-right");
					}
				});
			}
			return false;
		}
	});
//
//
//input validation
//
//
var trimInput = function(val){
	return val.replace(/^\s*|\s*$/g, "");
};
//checking the email if it's in a valid format
isEmail = function(value){
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if (filter.test(value)) {
		return true;
	}
	Bert.alert("Please use a valid Email Address","danger","growl-top-right");
	return false;
};
//checking the password if its more than 6 characters
isValidPassword = function(password){
	if(password < 6){
		Bert.alert("Password must be atleast 6 characters","danger","growl-top-right");
		return false;
	}
	return true;
};