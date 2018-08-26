import { Template } from 'meteor/templating';

import './post.html';

	Template.post.events({
		'submit form':function(event){
			event.preventDefault();
			var movieTitle = event.target.movieTitle.value;
			var description = event.target.description.value;
			var currentUserId = Meteor.userId();
			movieCollection.insert({
				title:movieTitle,
				description:description,
				createdBy:currentUserId
			});
			event.target.movieTitle.value = ""; //empty the input field after submit
			event.target.description.value = "";
		}
	});