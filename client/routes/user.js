const log = require('../logger');
const sendPacket = require('../sendPacket');

const { User} = require('../mongoConfig');

const maxHistoryLength = 100;

module.exports = app => {
  app.get('/user', (req, res) => {
    if(req.user === undefined) return res.json(sendPacket(0, 'Unable to save because User not logged in.'));
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

  app.post('/processLogin', (req, res) => {
    const { username, password, status } = req.body;
    if (status===1) {
      return res.json({success: 1})
    }
    return res.json({success: -1})
  })

}