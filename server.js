import restify from 'restify'
import corsMiddleware from 'cors'
import { formSignatureData } from './utils.js'
import { PORT, EXPLORER_URL } from './config.js'

export const startServer = (sendMessage) => {
  const server = restify.createServer({name: 'w3Bridge_bot'});

  const cors = corsMiddleware({
    credentials: true,
    preflightMaxAge: 5,
    origin: function (origin, callback) {
        callback(null, origin)
    }
  });
  server.pre(cors);

  server.use(restify.plugins.bodyParser())
  server.use(restify.plugins.queryParser())
  server.post('/event', eventHandler);

  server.get('/signature', getSignature);

  server.listen(PORT, function() {
    console.log('%s listening at %s', server.name, server.url);
  });

  async function getSignature(req, res) {
    res.json(formSignatureData(req.query.message))
  }

  async function eventHandler(req, res) {
    const event = req.body
    console.log(`[${event.uid}] Event: `, event);
    if (event.hash) {
      const message = event.signature ? `Signature: ${event.hash}` : `Transaction: ${EXPLORER_URL}/tx/${event.hash}`
      await sendMessage(event.uid, message)
    }
    res.send(200)
  }
}
