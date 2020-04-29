module.exports = app => {
  app.post('/external/allUsers', (req, res) => {
    console.log(req)
    return res.json(sendPacket(1, 'Done'))
  })
}