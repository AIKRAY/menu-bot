import { Telegraf } from 'telegraf';
import { LastMsgStore } from '../types';
import { deleteLastMsg } from '../helpers';

export function helpModule(bot: Telegraf, msgStore: LastMsgStore) {
  bot.action('btn-help', async (ctx) => {
    await deleteLastMsg(ctx, msgStore);

    const msg = await ctx.reply('Help Information');
    msgStore[msg.chat.id] = msg.message_id;

    ctx.answerCbQuery();
  });

  bot.help(async (ctx) => {
    await deleteLastMsg(ctx, msgStore);

    const msg = await ctx.reply('Help Information');
    msgStore[msg.chat.id] = msg.message_id;
  });
}
