import { Telegraf } from 'telegraf';
import { LastMsgStore } from '../types';
import { deleteLastMsg } from '../helpers';

export function languageModule(bot: Telegraf, msgStore: LastMsgStore) {
  bot.action('btn-language', async (ctx) => {
    await deleteLastMsg(ctx, msgStore);

    const msg = await ctx.reply('Choose your language:', {
      reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
          [{ text: 'English', callback_data: 'language-en' }],
          [{ text: 'ქართული', callback_data: 'language-ka' }],
          [{ text: 'Русский', callback_data: 'language-ru' }],
        ],
      },
    });
    msgStore[msg.chat.id] = msg.message_id;

    ctx.answerCbQuery();
  });

  bot.command('language', async (ctx) => {
    await deleteLastMsg(ctx, msgStore);

    const msg = await ctx.reply('Choose your language:', {
      reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
          [{ text: 'English', callback_data: 'language-en' }],
          [{ text: 'ქართული', callback_data: 'language-ka' }],
          [{ text: 'Русский', callback_data: 'language-ru' }],
        ],
      },
    });
    msgStore[msg.chat.id] = msg.message_id;
  });

  bot.action('language-en', async (ctx) => {
    await deleteLastMsg(ctx, msgStore);

    ctx.answerCbQuery();
  });

  bot.action('language-ka', async (ctx) => {
    await deleteLastMsg(ctx, msgStore);

    ctx.answerCbQuery();
  });

  bot.action('language-ru', async (ctx) => {
    await deleteLastMsg(ctx, msgStore);

    ctx.answerCbQuery();
  });
}
