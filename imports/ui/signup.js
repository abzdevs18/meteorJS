import { Template } from 'meteor/templating';

import './signup.html';

	Template.signup.events({
		'submit form':function(event){
			event.preventDefault();
			//below variable targets the inputs from the form
			var name = trimInput(event.target.Fname.value);
			var lastname = trimInput(event.target.lastname.value);
			var email = trimInput(event.target.email.value);
			var password = trimInput(event.target.password.value);
			var userId = Meteor.userId(); //we need this to set the owner of the data
			if (isNotEmpty(name) && isNotEmpty(lastname) && isValidPassword(password) && isEmail(email)) {
				// Meteor accounts-password function
				Accounts.createUser({
					name: name,
					lastname: lastname,
					email: email,
					password: password,
					profile: {
					}
				},function(err){
					if (err) {
						Bert.alert(err.reason,"danger","growl-top-right");
					}else{
						Bert.alert("Account created successfully","success","growl-top-right");
						Router.go("/");
					}
				});
				event.target.Fname.value="";
				event.target.lastname.value="";
				event.target.email.value="";
				event.target.password.value="";
			}
		}
	});

//input validation
var trimInput = function(val){
	return val.replace(/^\s*|\s*$/g, "");
};
//checking if the field is not empty
var isNotEmpty = function(value){
	if (value && value !== '') {
		return true;
	}
	Bert.alert("Please fill-in all fields","danger","growl-top-right");
	return false;
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