var mongoose		= require('mongoose'),
	mongooseHidden	= require('mongoose-hidden')(),
	Schema			= mongoose.Schema;

var minlength 	= [3,'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({minlength})'];

var UserSchema	= new Schema({
	username: {
		type: String,
		minlength: minlength,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		hide: true
	}
});

UserSchema.plugin(mongooseHidden);

module.exports	= mongoose.model('User', UserSchema, 'users');