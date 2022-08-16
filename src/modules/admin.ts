import { Telegraf } from 'telegraf';
import { DishMenu } from '../constants';

export function adminModule(bot: Telegraf) {
  bot.command('admin', async (ctx) => {
    await ctx.reply('Choose an action:', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Edit Menu', callback_data: 'edit-menu' },
            { text: 'Add Admin', callback_data: 'add-admin' },
          ],
        ],
      },
    });
  });

  bot.action('btn-admin', async (ctx) => {
    await ctx.reply('Choose an action:', {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Edit Menu', callback_data: 'edit-menu' },
            { text: 'Add Admin', callback_data: 'add-admin' },
          ],
        ],
      },
    });

    ctx.answerCbQuery();
  });

  bot.action('edit-menu', async (ctx) => {
    for (const item of DishMenu) {
      await bot.telegram.sendPhoto(ctx.chat!.id, `${item.img}`, {
        parse_mode: 'HTML',
        caption: `<b>${item.name}</b>
  <i>${item.description}</i>
  ${item.price} GEL
          `,
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

  bot.action('add-admin', async (ctx) => {
    await ctx.reply('Send me the New Admin contact', {
      reply_markup: {
        one_time_keyboard: true,
        keyboard: [[{ text: 'Share Contact', request_contact: true }]],
      },
    });

    ctx.answerCbQuery();
  });
}
