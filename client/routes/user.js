const passport = require("passport");
const log = require('../logger');
const sendPacket = require('../sendPacket');
const clickLogger = require('../clickLogger');

const { User } = require('../mongoConfig');

const maxHistoryLength = 100;

module.exports = app => {
  app.get('/user', (req, res) => {
    if(req.user === undefined) return res.json(sendPacket(0, 'Unable to fetch because User not logged in.'));
    User.findById(req.user._id, (err, user) => {
      if(err) return res.json(sendPacket(0, 'Unable to find user'))
      return res.json(sendPacket(1, 'Successfully found user', { history: user['history'], likes: user['likes'], dislikes: user['dislikes'] }));
    })
  });

  app.get('/updateHistory', async (req, res) => {
    const redirectUrl = req.query.redirect
    const user = await User.findOne({ _id: req.user._id })
  
    if (!('history' in user)) user['history']=[];
    if (user.history.length >= maxHistoryLength) user.history.shift();
    
    user.history.push(redirectUrl);
    await user.save(err => {
      if (err) log("error", 'Error saving user history update');
    })

    clickLogger.recordClick(req.query.redirect, req.query.userQuery);
    if (user!==null) log("redirect", `Sending user ${user.userid} to ${redirectUrl}`)
    return res.redirect(redirectUrl)
  })

  app.post('/changeLikeStatus', (req, res) => {
    const { likeStatus, url } = req.body;
    if(req.user === undefined) return res.json(sendPacket(0, 'Unable to save because User not logged in.'));
    User.findById(req.user._id, (err, user) => {
      if(err){
        log('error', 'Error finding user. Could not change like status');
        return res.json(sendPacket(0, 'Unable to find user'));
      }
  
      if(!('likes' in user)) user['likes']= {};
      if(!('dislikes' in user)) user['dislikes']= {};
  
      const dotReplacedUrl = url.replace(/\./g, '%114')
  
      if (likeStatus === 1) {
        if (dotReplacedUrl in user['dislikes']) delete user['dislikes'][dotReplacedUrl];
        user['likes'][dotReplacedUrl]=true;
      }
  
      else if (likeStatus === -1) {
        if (dotReplacedUrl in user['likes']) delete user['likes'][dotReplacedUrl];
        user['dislikes'][dotReplacedUrl]=true;
      }
  
      else {
        if (dotReplacedUrl in user['likes']) delete user['likes'][dotReplacedUrl];
        if (dotReplacedUrl in user['dislikes']) delete user['dislikes'][dotReplacedUrl];
      }
  
      user.markModified('likes');
      user.markModified('dislikes');
  
      user.save( (err, newUser) => {
        if(err) {
          return res.json(sendPacket(0, 'Unable to save like status updates'));
        }
        return res.json(sendPacket(1, 'Document like status successfully changed', {newLikeStatus: likeStatus, user: newUser}));
      })
    })
  })

  app.post('/processLogin', (req, res, next) => {
    log('login', 'Received login request');

    passport.authenticate('local', (err, user, info) => {
      if(err) return next(err);
      if(!user) return res.json(sendPacket(0, 'Login unsuccessful.'))

      req.login(user, (err) => {
        if(err) return next(err);
        return res.json(sendPacket(1, 'Login successful', {userid: user.userid}))
      })

    }) (req, res, next)
  })

  app.get('/validateUsername/:username', (req, res) => {
    const username = req.params['username'];
    
    User.findOne({ userid: username }).then((existingUser) => {
      if (existingUser) {
        log("Register", "Found existing user")
        return res.json(sendPacket(0, 'Email already exists in system.'))
      } else {
        log("Register", 'No user exists')
        return res.json(sendPacket(1, 'Email is free within system.'))
      }
    });
  })

  app.post('/processRegister', (req, res) => {
    //TODO: Create a new entry for the user in the User table. Use bcrypt to hash the password. Then log them in using a new passport local strategy.
    //Redirect to homepage (main search screen) once completed
    const { username, password} = req.body;
    let successFullyCreated = true;

    if(successFullyCreated) {
      return res.json(sendPacket(1, 'Successfully created user'));
    }
  })

  app.get('/recentQueries', (req, res) => {
    if(req.user === undefined) return res.json(sendPacket(0, 'Unable to fetch because User not logged in.'));
    User.findById(req.user._id, (err, user) => {
      if(err) {
        log('error', 'Error finding user. Could not get recent queries');
        return res.json(sendPacket(0, 'Unable to find user'))
      }
      return res.json(sendPacket(1, 'Successfully found user recent queries', { recent_queries: user['recent_queries'] }));
    })
  });

}