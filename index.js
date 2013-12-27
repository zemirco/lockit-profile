
var path = require('path');
var moment = require('moment');
var utils = require('lockit-utils');

module.exports = function(app, config) {

  // load database adapter
  var adapter = require('lockit-' + config.db + '-adapter')(config);

  // GET /profile
  app.get('/profile', utils.restrict(config), function(req, res) {
    
    // get user from db
    adapter.find('email', req.session.email, function(err, user) {
      if (err) console.log(err);
            
      // render view
      res.render(path.join(__dirname, 'views', 'profile'), {
        title: 'Profile',
        previousLoginTime: moment(user.previousLoginTime).format('ddd, MMM Do YYYY - HH:mm:ss'),
        previousLoginIp: user.previousLoginIp,
        currentLoginTime: moment(user.currentLoginTime).format('ddd, MMM Do YYYY - HH:mm:ss'),
        currentLoginIp: user.currentLoginIp,
        failedLoginAttempts: req.session.failedLoginAttempts,
        memberFor: moment(user.emailVerificationTimestamp).fromNow(true)
      });
      
    });
    
  });
  
};