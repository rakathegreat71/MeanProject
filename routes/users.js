var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database')


router.post('/authenticate', (req, res) =>{
	const username = req.body.username;
	const password = req.body.password;

	User.getUserByUsername(username, (err, user) => {
		if(err) throw err;
		if(!user){
			return res.json({success: false, msg: 'user not found'});
		}
		console.log(user);
		User.comparePassword(password, user.password, (err, isMatch) => {
			if(err) throw err;
			if(isMatch){
				// https://stackoverflow.com/questions/47117709/payload-error-in-jsonwebtoken 	
				const token = jwt.sign(user.toJSON(), config.secret, {
					expiresIn:604800
				});

				res.json({
					success: true,
					token: "Bearer " +token,
					user:{
						id: user._id,
						name:user.name,
						username:user.username,
						email:user.email
					}
				})
			}
			else{
				return res.json({success:false, msg: "wrong password"})
			}
		})
	})
});


router.post('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
	console.log('it is working')
	res.json({user: req.user});
})


router.post('/register', (req, res) =>{
	let newUser = new User({
		name:req.body.name,
		email:req.body.email,
		username:req.body.username,
		password:req.body.password
	})

	User.addUser(newUser, (err, user) =>{
		if (err) {
			res.json({success: false, msg:"failed to register user"});
		}
		else{
			res.json({success: true, msg:"user registered"});
		}
	})
});
                                                    
module.exports = router;