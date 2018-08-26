
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

movieCollection = new Mongo.Collection('movies');


import '../imports/ui/body.js';
import '../imports/ui/login.js';
import '../imports/ui/movie.js';
import '../imports/ui/navigation.js';
import '../imports/ui/signup.js';
import '../imports/ui/userProfile.js';
import '../imports/ui/post.js';

// routing 
Router.route('/',function(){
	this.render('home');
});
Router.route('/profile',function(){
	this.render('/userProfile');
});
Router.route('/signup',function(){
	this.render('signup');
});
Router.route('/movie',function(){
	this.render('movie');
});









