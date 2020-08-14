var express = require('express');
var router = express.Router();
var GMAIL_USER = 'l.george221998@gmail.com';
const GMAIL_PASS = 'Arsenal456*'
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { home: 'active' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { home: 'active' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { about: 'active' });
});

router.get('/pricing', function(req, res, next) {
  res.render('pricing', { pricing: 'active' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { contact: 'active' });
});

router.get('/my-fitness', function(req, res, next) {
  res.render('login', { login: 'active' });
});

router.get('/privacy_policy', function(req, res, next) {
  res.render('privacy_policy', { privacy: '' });
});

router.post('/contactme', urlencodedParser, function (req, res) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: GMAIL_USER,
    subject: 'Message via website from ' + req.body.name,
    text: `name: ${req.body.name} \n \n` +
    `email: (${req.body.email}) \n \n` + 
    `message: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      res.render('contactme', { error: true });
    }
    else {
      res.render('contactme', { error: false });
    }
  });
});


module.exports = router;
