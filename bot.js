import { Telegraf } from 'telegraf'
import { buildSignatureUrl, buildTransactionUrl } from './utils.js'

export const startBot = token => {
  const bot = new Telegraf(token)

  bot.use((ctx) => {
    // Check if the update contains a command
    if (ctx.updateType === 'message' && ctx.message.text.startsWith('/')) {
        const command = ctx.message.text.split(' ')[0];
        const args = ctx.message.text.slice(command.length + 1).trim();

        // Handle different commands here
        switch (command) {
            case '/demoTransaction':
                return demoTransaction(ctx, args);
            case '/demoSignature':
                return demoSignature(ctx, args);
            default:
                return ctx.reply('Unknown command.');
        }
    }
  });

  function demoSignature(ctx, message) {
    const chatId = ctx.chat.id
    console.log(`[${chatId}] Signature request in chat`)
    console.log(`[${chatId}] Client data:`, ctx.chat)

    ctx.reply(
      buildSignatureUrl({
        message,
        botName: ctx.botInfo.username,
        chatId: ctx.chat.id
      })
    )
  }

  function demoTransaction(ctx, value) {
    const chatId = ctx.chat.id
    console.log(`[${chatId}] Transaction request in chat`)
    console.log(`[${chatId}] Client data:`, ctx.chat)

    ctx.reply(
      buildTransactionUrl({
        value,
        botName: ctx.botInfo.username,
        chatId: ctx.chat.id
      })
    )
  }

  bot.launch();

  const sendMessage = async (chatId, text) => {
    try {
      await bot.telegram.sendMessage(chatId, text);
      console.log(`Message sent to chat ID ${chatId}`);
    } catch (error) {
      console.error(`Failed to send message to chat ID ${chatId}: ${error.message}`);
    }
  }

  return { sendMessage }

}
