import { Context, Telegraf } from 'telegraf';
import { DishMenu } from '../constants';

export function menuModule(bot: Telegraf) {
  bot.command('menu', async (ctx) => {
    await replyWithMenu(bot, ctx);
  });

  bot.action('btn-menu', async (ctx) => {
    await replyWithMenu(bot, ctx);
    ctx.answerCbQuery();
  });
}

async function replyWithMenu(bot: Telegraf, ctx: Context) {
  for (const item of DishMenu) {
    await bot.telegram.sendPhoto(ctx.chat!.id, `${item.img}`, {
      parse_mode: 'HTML',
      caption: `<b>${item.name}</b>
<i>${item.description}</i>
${item.price} GEL
        `,
    });
  }
}
