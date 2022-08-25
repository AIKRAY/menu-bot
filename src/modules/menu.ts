import { Context, Telegraf } from 'telegraf';
import { DishMenu } from '../constants';
import { getMenuItem } from '../helpers';
import { DishMenuItem } from '../types';

export function menuModule(bot: Telegraf) {
  bot.command('menu', async (ctx) => {
    await replyWithMenu(bot, ctx);
  });

  bot.action('btn-menu', async (ctx) => {
    await replyWithMenu(bot, ctx);
    await ctx.answerCbQuery();
  });

  bot.action('edit-menu', async (ctx) => {
    for (const item of DishMenu) {
      await bot.telegram.sendPhoto(ctx.chat!.id, `${item.img}`, {
        parse_mode: 'HTML',
        caption: getMenuItem(item),
        reply_markup: getMenuControls(item),
      });
    }

    await ctx.answerCbQuery();
  });

  bot.action(/toggle-menu-item (.+)/, async (ctx) => {
    const menuItemId = Number(ctx.match[1]);

    DishMenu.forEach((item) => {
      if (item.id === menuItemId) {
        item.hidden = !item.hidden;
        ctx.editMessageReplyMarkup(getMenuControls(item));
      }
    });

    await ctx.answerCbQuery();
  });

  bot.action(/edit-menu-item (.+)/, async (ctx) => {
    const menuItemId = Number(ctx.match[1]);

    await ctx.answerCbQuery();
  });

  bot.action(/delete-menu-item (.+)/, async (ctx) => {
    const menuItemId = Number(ctx.match[1]);
    const index = DishMenu.findIndex((item) => item.id === menuItemId);

    if (index > -1) {
      const itemToRemove = DishMenu[index];
      DishMenu.splice(index, 1);
      await ctx.deleteMessage();
      await ctx.reply(`Menu item ${itemToRemove.name} has been removed`);
    }

    await ctx.answerCbQuery();
  });
}

async function replyWithMenu(bot: Telegraf, ctx: Context) {
  for (const item of DishMenu.filter((item) => !item.hidden)) {
    await bot.telegram.sendPhoto(ctx.chat!.id, `${item.img}`, {
      parse_mode: 'HTML',
      caption: getMenuItem(item),
    });
  }
}

function getMenuControls(item: DishMenuItem) {
  return {
    inline_keyboard: [
      [
        { text: 'Edit', callback_data: `edit-menu-item ${item.id}` },
        { text: 'Delete', callback_data: `delete-menu-item ${item.id}` },
        {
          text: item.hidden ? 'Show' : 'Hide',
          callback_data: `toggle-menu-item ${item.id}`,
        },
      ],
    ],
  };
}
