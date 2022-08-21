import { Telegraf } from 'telegraf';

export function helpModule(bot: Telegraf) {
  bot.help(async (ctx) => {
    await ctx.reply('Help Information');
  });

  bot.action('btn-help', async (ctx) => {
    await ctx.reply('Help Information');
    await ctx.answerCbQuery();
  });
}
