import { Meteor } from 'meteor/meteor';

import '../imports/api/movies.js';
movieCollection = new Mongo.Collection('movies');

Meteor.startup(() => {
  // code to run on server at startup
});

	Meteor.publish("movies", function(){
		var currentUserId = this.userId;
		return movieCollection.find({createdBy: currentUserId});
	
	});

	 movieCollection.allow({
	 	remove: function(){
	 		return true;
	 	},
	 	insert: function(){
	 		return true;
	 	}
	 });