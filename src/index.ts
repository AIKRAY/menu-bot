import { Telegraf } from 'telegraf';
import { deleteLastMsg } from './helpers';
import { menuModule, languageModule, helpModule, aboutModule } from './modules';
import { LastMsgStore } from './types/msg-store';

const bot = new Telegraf('5459712119:AAF7YNTdP2QzTRY5AD0lXaTvKXC_ERgOJIk');

const msgStore: LastMsgStore = {};

bot.start(async (ctx) => {
  await deleteLastMsg(ctx, msgStore);

  const msg = await ctx.reply('Choose an option:', {
    reply_markup: {
      resize_keyboard: true,
      inline_keyboard: [
        [{ text: 'Menu', callback_data: 'btn-menu' }],
        [{ text: 'Language', callback_data: 'btn-language' }],
        [
          { text: 'Help', callback_data: 'btn-help' },
          { text: 'About', callback_data: 'btn-about' },
        ],
      ],
    },
  });

  msgStore[msg.chat.id] = msg.message_id;
});

menuModule(bot, msgStore);
languageModule(bot, msgStore);
helpModule(bot, msgStore);
aboutModule(bot, msgStore);

bot.launch();

bot.command('admin', async (ctx) => {
  await deleteLastMsg(ctx, msgStore);

  if (ctx.from.id === 5391764441) {
    const msg = await ctx.reply('Choose an action:', {
      reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
          [{ text: 'Change Menu', callback_data: 'language-en' }],
        ],
      },
    });
    msgStore[msg.chat.id] = msg.message_id;
  }
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
