import { Template } from 'meteor/templating';
import { movieCollection } from '../api/movies.js';
import { UserImages } from '../api/movies.js';
import { ProfileImages } from '../api/movies.js';

import './userProfile.html';

if (Meteor.isClient) {

	Meteor.subscribe("ProfileImages");
	Meteor.subscribe("UserImages");

	Template.userProfile.helpers({
		'UserImages':function(){
		var username = Meteor.user().username;
		var userId = Meteor.userId();
		var URL = UserImages.findOne({username: username},{userId: userId});
		return URL;			
		}
	});

	Template.userProfile.events({
		'submit .edit-profile':function(e){
			var file = $('#profileImage').get(0).files[0];
			if (file) {
				fsFile = new FS.File(file);
				ProfileImages.insert(fsFile, function(err, result){
					if (err) {
						throw new Meteor.Error(err);
					}else{
						var imageLoc = '/cfs/files/ProfileImages/'+result._id; //what this does it grab the url from the result upload
						UserImages.insert({
							userId :Meteor.userId(),
							username: Meteor.user().username,
							image: imageLoc,
						});
						// Router.go('/');
						Bert.alert("Profile Update Succeful","success","growl-top-right");
					}
				});
			}
			return false;
		}
	});
}

