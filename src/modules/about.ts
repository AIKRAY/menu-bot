import { Telegraf } from 'telegraf';

export function aboutModule(bot: Telegraf) {
  bot.command('about', async (ctx) => {
    await ctx.reply(
      `This bot was created to make your life the best of the best!`
    );
  });

  bot.action('btn-about', async (ctx) => {
    await ctx.reply(
      `This bot was created to make your life the best of the best!`
    );

    ctx.answerCbQuery();
  });
}
