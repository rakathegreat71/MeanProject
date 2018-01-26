var express = require('express');
var router = express.Router();
var multer = require('multer');


router.get('/show', (req, res) =>{
	res.send("show route is working ");
})



var store = multer.diskStorage({
	destination:function (req, res, cb) {
		cb(null, './uploads/')
	},

	filename:function (req, file, cb) {
		cb(null, Date.now() +'-' +file.originalname);	
	}
});

var upload = multer({storage: store}).single('file');


router.post('/upload', function (req, res, next) {
	console.log('post is workin')
	upload(req, res, (err) =>{
		if (err) {
			return res.status(501).json({error:err});
		}
		res.json(
			{
				originalname:req.file.originalname, 
				filename:req.file.filename
			});
	})
})


// router.post('/upload', (req, res) => {
// 	res.send('hello it is working');
// })
module.exports = router;