import { startServer } from './server.js'
import { startBot } from './bot.js'
import { BOT_TOKEN } from './config.js'

const bot = startBot(BOT_TOKEN)
startServer(bot.sendMessage)

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
