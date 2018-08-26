import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './movie.html';
if (Meteor.isClient) {
	Meteor.subscribe("movies");

	Template.movie.helpers({
		'movies':function(){
			var currentUserId = Meteor.userId();
			return movieCollection.find({createdBy: currentUserId});
		}
	});
	Template.movie.events({
		'mouseover .favorite':function(){
			var playerID = this._id;
			Session.set("selectedMovie", playerID);
		},
		'click .delete':function(){
			var selectedMovie = Session.get("selectedMovie");
			movieCollection.remove({_id:selectedMovie},function(err){
				if (err) {
					Bert.alert(err.reason,"danger","growl-top-right");
					return false;
				}else{
					// Router.go('/');
					Bert.alert("successfully remove","success","growl-top-right");
				}
			});
		}
	});
}