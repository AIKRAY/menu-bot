import { Context, Telegraf } from 'telegraf';

export function aboutModule(bot: Telegraf) {
  bot.command('about', async (ctx) => {
    await replyWithAboutMsg(ctx);
  });

  bot.action('btn-about', async (ctx) => {
    await replyWithAboutMsg(ctx);
    await ctx.answerCbQuery();
  });
}

function replyWithAboutMsg(ctx: Context) {
  return ctx.reply(
    `The bot is made for convenience. You, as a client, don't have to wait for the menu, there is an opportunity to look at the photos. For restaurants, it's easy to make changes, just through the phone, without retyping a lot of paper. Let's take care of nature together and look forward to future updates and improvements!`
  );
}
