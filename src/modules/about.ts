import { Telegraf } from 'telegraf';
import { LastMsgStore } from '../types';
import { deleteLastMsg } from '../helpers';

export function aboutModule(bot: Telegraf, msgStore: LastMsgStore) {
  bot.action('btn-about', async (ctx) => {
    await deleteLastMsg(ctx, msgStore);

    const msg = await ctx.reply(
      `This bot was created to make your life the best of the best!`
    );
    msgStore[msg.chat.id] = msg.message_id;

    ctx.answerCbQuery();
  });

  bot.command('about', async (ctx) => {
    await deleteLastMsg(ctx, msgStore);

    const msg = await ctx.reply(
      `This bot was created to make your life the best of the best!`
    );
    msgStore[msg.chat.id] = msg.message_id;
  });
}
