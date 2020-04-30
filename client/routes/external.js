const log = require('../logger');
const sendPacket = require('../sendPacket');

const { User } = require('../mongoConfig');

module.exports = app => {
  app.post('/external/allUsers', (req, res) => {
    log('external', 'Sending all users to recommender')
    const { code } = req.body
    console.log("code: ", code)
    User.find({}, (err, users) => {
      if(err) {
        log('error', 'There was an error fetching all users');
        return res.json(sendPacket(0, 'Error fetching all users'))
      }
      console.log(users)
      return res.json(sendPacket(1, 'Done', {users: users}))
    })
  })
}