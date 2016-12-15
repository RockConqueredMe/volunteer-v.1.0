var express = require('express');
var router = express.Router();

//mongoose connection
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/event');

//schema (blueprint)
var Schema = mongoose.Schema;

var eventSchema = new Schema({
  title: String,
  typeOfWork: String,
  dateOfService: String,
  hours: String
});

//model (access to the collection)
var Work = mongoose.model('Work', eventSchema);

//insert (CRUD)
router.post('/insert', function(req,res,next){
  var item = {
    title: req.body.title,
    typeOfWork: req.body.typeOfWork,
    dateOfService: req.body.dateOfService,
    hours: req.body.hours
  };
  var data = new Work(item);

data.save();
res.redirect('/event');
//res.render('new',{items: doc});
});


router.get('/get-data', function(req,res,next){
  Work.find()
    .then(function(doc){
      res.render('event', {items: doc});
    });
});

router.get('/delete-data', function(req,res,next){
  Work.find()
    .then(function(doc){
      res.render('create', {items: doc});
    });
});

//get (CRUD)
router.get('/data', function(req,res,next){
  Work.find()
    .then(function(doc){
      res.render('create', {items: doc});
    });
});

//delete (CRUD)
router.get('/deletebtn/:id', function(req,res,next){
  var id = req.params.id;
  Work.findByIdAndRemove(id).exec();
  res.redirect('/create');
});

//update (CRUD)
router.post('/update', function(req,res,next){
  var id = req.body.id;

  Work.findById(id, function(err,doc){
    if(err){
      console.error('error, no entry found');
    }

      doc.title = req.body.title;
      doc.typeOfWork = req.body.typeOfWork;
      doc.dateOfService = req.body.dateOfService;
      doc.hours = req.body.hours;
      doc.save();
  });
  res.redirect('/');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { items: {} });
});

// router.get('/home', function(req, res, next){
//   res.render('home', {title: 'Home'});
// });

// router.get('/signup', function(req, res, next){
//   res.render('signup', {title: 'Sign-Up'});
// });

router.get('/event', function(req, res, next){
  res.render('event', { items: {} });
});

router.get('/create', function(req, res, next){
  res.render('create', { items: {} });
});


module.exports = router;
