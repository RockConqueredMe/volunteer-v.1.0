var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Volunteer' });
});

// router.get('/home', function(req, res, next){
//   res.render('home', {title: 'Home'});
// });

router.get('/signup', function(req, res, next){
  res.render('signup', {title: 'Sign-Up'});
});

router.get('/event', function(req, res, next){
  res.render('event', {title: 'Events'});
});

router.get('/create', function(req, res, next){
  res.render('create', {title: 'Create'});
});


module.exports = router;
