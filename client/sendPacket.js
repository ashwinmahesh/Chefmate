const sendPacket = (success, message, content={}) => {
  return { success: success, message: message, content: content };
}

module.exports = sendPacket;