const log = require('../logger');
const makeRequest = require('../makeRequest');
const sendPacket = require('../sendPacket');
const clickLogger = require('../clickLogger');

const { User, Query } = require('../mongoConfig');

var queryStartTime;

module.exports = (app) => {
  app.get('/search/:query', async (request, response) => {
    const query = request.params['query'];
    log('query', `Received query from client: ${query}. Sending data to ranker`);
    queryStartTime = Date.now();
    const data = await makeRequest('ranker', `query/${query}`);

    Query.findById(query, (err, oldQueryObj) => {
      if (err) log('error', 'Error finding query.');
      else if (oldQueryObj === null) {
        const newQueryObj = new Query({ _id: query, count: 1 });
        newQueryObj.save((err) => {
          if (err) log('error', `Unable to save query: ${query}`);
        });
      } else {
        oldQueryObj['count'] += 1;
        oldQueryObj.save((err) => {
          if (err) log('error', `Unable to update query: ${query}`);
        });
      }
    });

    log('Fetch', `Received response from Ranker: ${data.message}`);
    return response.json(
      sendPacket(
        data.success,
        `Successfully received response from ranker: ${query}`,
        data.content
      )
    );
  });

  app.post('/fetchDocuments', async (req, res) => {
    const fetchStartTime = Date.now();
    log('fetch', 'Fetching documents from ranker using sorted list of document urls');

    const docUrls = req.body['docUrls'].slice(0, 60);
    const data = await makeRequest('ranker', 'fetchDocuments', 'POST', {
      docUrls: docUrls,
    });
    if(data['success'] !== 1) {
      return res.json(sendPacket(-1, 'Error connecting to ranker'));
    }
    const documents = data['content']['documents'];
    log(
      'fetch',
      `Received documents from ranker. Execution time ${(Date.now() - fetchStartTime) /
        1000} seconds.`
    );

    if (req.user != undefined) {
      User.findById(req.user._id, (err, user) => {
        if (err) log('error', 'Unable to find user');
        else {
          clickLogger.setCurrQueryTime(Date.now() - queryStartTime);
          return res.json(
            sendPacket(1, 'Successfully fetched documents', {
              documents: documents,
              likes: user['likes'],
              dislikes: user['dislikes'],
            })
          );
        }
      });
    } else {
      clickLogger.setCurrQueryTime(Date.now() - queryStartTime);
      return res.json(
        sendPacket(1, 'Successfully fetched documents', {
          documents: documents,
          likes: {},
          dislikes: {},
        })
      );
    }
  });

  app.get('/autocomplete/:query', async (req, res) => {
    const query = req.params['query'];
    const regexp = new RegExp('^' + query);
    const queries = await Query.find({ _id: regexp })
      .sort('-count')
      .limit(8);
    return res.json(
      sendPacket(1, 'Successfully retrieved queries', { queries: queries })
    );
  });
};
