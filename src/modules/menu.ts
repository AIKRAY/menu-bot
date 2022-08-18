import { Context, Telegraf } from 'telegraf';
import { DishMenu } from '../constants';
import { getMenuItem } from '../helpers';

export function menuModule(bot: Telegraf) {
  bot.command('menu', async (ctx) => {
    await replyWithMenu(bot, ctx);
  });

  bot.action('btn-menu', async (ctx) => {
    await replyWithMenu(bot, ctx);
    ctx.answerCbQuery();
  });

  bot.action('edit-menu', async (ctx) => {
    for (const item of DishMenu) {
      await bot.telegram.sendPhoto(ctx.chat!.id, `${item.img}`, {
        parse_mode: 'HTML',
        caption: getMenuItem(item),
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Edit', callback_data: 'edit-menu-item' },
              { text: 'Delete', callback_data: 'delete-menu-item' },
              { text: 'Hide', callback_data: 'hide-menu-item' },
            ],
          ],
        },
      });
    }

    ctx.answerCbQuery();
  });
}

async function replyWithMenu(bot: Telegraf, ctx: Context) {
  for (const item of DishMenu) {
    await bot.telegram.sendPhoto(ctx.chat!.id, `${item.img}`, {
      parse_mode: 'HTML',
      caption: getMenuItem(item),
    });
  }
}
