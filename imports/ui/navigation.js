import { Template } from 'meteor/templating';

import './navigation.html';

	Template.navigation.events({
		'click .logout':function(event){
			event.preventDefault();
			Meteor.logout(function(err){
				if (err) {
					Bert.alert(err.reason,"danger","growl-top-right");
				}else{
					Router.go('/');//why first, bcuz the user direct to home b4 alert
					Bert.alert("Logout SUCCESS!!!","success","growl-top-right");
				}
			});
		}
	});