import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const UserImages = new Mongo.Collection('UserImages');
export const ProfileImages = new FS.Collection("ProfileImages",{
 	stores: [new FS.Store.GridFS("ProfileImages")]
 });
 ProfileImages.allow({
 	insert:function(userId,doc){
 		return true;
 	},
 	update: function(userId,doc,fields,modifier){
 		return true;
 	},
 	download:function(){
 		return true;
 	}
 });
 
 UserImages.allow({
 	insert: function(){
 		return true;
 	},
 	update: function(userId,doc,fields,modifier){
 		return true;
 	}
 });
 if (Meteor.isServer) {
 	Meteor.publish("ProfileImages",function(){
		return ProfileImages.find();
	}); 
	Meteor.publish("UserImages",function(){
		return UserImages.find();
	});
 }

