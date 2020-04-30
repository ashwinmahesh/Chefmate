const log = require('../logger');
const sendPacket = require('../sendPacket');

const { User } = require('../mongoConfig');

//TODO - Encrypt this code using bcrypt. Match the body passcode to the encrypted one, same as standard password.
const AUTH_CODE = 'harrys_chocolate_shop';

module.exports = app => {
  app.post('/external/allUsers', (req, res) => {
    log('external', 'Sending all users to recommender')
    const { code } = req.body
    if(code !== AUTH_CODE) {
      log('alert', 'Invalid auth code entered.')
      return res.json(sendPacket(0, 'Error fetching all users'))
    }

    User.find({}, (err, users) => {
      if(err) {
        log('error', 'There was an error fetching all users');
        return res.json(sendPacket(0, 'Error fetching all users'))
      }
      return res.json(sendPacket(1, 'Done', {users: users}))
    })
  })
}