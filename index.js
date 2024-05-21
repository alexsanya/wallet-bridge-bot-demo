const { Telegraf } = require('telegraf')
const restify = require('restify')

const PORT = 8085
const EXPLORER_URL="https://polygonscan.com"
const EVENTS_ENDPOINT="http://ec2-18-209-66-210.compute-1.amazonaws.com:8085/event"
const DEMO_SIGNATURE_URL = 'http://wallet-bridge.s3-website-us-east-1.amazonaws.com/?botName={botName}&type=signature&uid={uid}&source=https%3A%2F%2Fstatic-img-hosting.s3.amazonaws.com%2Fsignature.json&callback=' + 
  encodeURIComponent(EVENTS_ENDPOINT)
const DEMO_TRANSACTION_URL = 'http://wallet-bridge.s3-website-us-east-1.amazonaws.com/?botName={botName}&type=transaction&uid={uid}&source=https%3A%2F%2Fstatic-img-hosting.s3.amazonaws.com%2Ftransaction.json&callback='+
  encodeURIComponent(EVENTS_ENDPOINT)

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.command('demoSignature', ctx => {
  const chatId = ctx.chat.id
  console.log(`[${chatId}] Signature request in chat`)
  console.log(`[${chatId}] Client data:`, ctx.chat)

  ctx.reply(DEMO_SIGNATURE_URL.replace('{uid}', ctx.chat.id).replace('{botName}', ctx.botInfo.username))
})
bot.command('demoTransaction', ctx => {
  const chatId = ctx.chat.id
  console.log(`[${chatId}] Transaction request in chat`)
  console.log(`[${chatId}] Client data:`, ctx.chat)

  ctx.reply(DEMO_TRANSACTION_URL.replace('{uid}', ctx.chat.id).replace('{botName}', ctx.botInfo.username))
})
bot.launch();

async function sendMessage(chatId, text) {
  try {
    await bot.telegram.sendMessage(chatId, text);
    console.log(`Message sent to chat ID ${chatId}`);
  } catch (error) {
    console.error(`Failed to send message to chat ID ${chatId}: ${error.message}`);
  }
}

const server = restify.createServer({name: 'w3Bridge_bot'})

server.use(restify.plugins.bodyParser())
server.post('/event', eventHandler);

server.listen(PORT, function() {
  console.log('%s listening at %s', server.name, server.url);
});


async function eventHandler(req, res) {
  const event = req.body
  console.log(`[${event.uid}] Event: `, event);
  if (event.hash) {
    const message = event.signature ? `Signature: ${event.hash}` : `Transaction: ${EXPLORER_URL}/tx/${event.hash}`
    await sendMessage(event.uid, message)
  }
  res.send(200)
}

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
