import { Telegraf } from 'telegraf';
import { AdminButtons, Admins, ChangeAdminsButtons } from '../constants';

export function adminModule(bot: Telegraf) {
  bot.command('admin', async (ctx) => {
    await ctx.reply('Choose an action:', {
      reply_markup: {
        inline_keyboard: AdminButtons,
      },
    });
  });

  bot.action('btn-admin', async (ctx) => {
    await ctx.reply('Choose an action:', {
      reply_markup: {
        inline_keyboard: AdminButtons,
      },
    });

    ctx.answerCbQuery();
  });

  bot.action('add-admin', async (ctx) => {
    await ctx.reply(
      'Forward me any message from the user you want to make admin.'
    );

    ctx.answerCbQuery();
  });

  bot.action('change-admins', async (ctx) => {
    for (const admin of Admins.filter((admin) => !admin.isSuper)) {
      await ctx.replyWithHTML(
        `${admin.firstName} ${admin.username && `(@${admin.username})`} `,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Delete', callback_data: 'delete-admin' }],
            ],
          },
        }
      );
    }

    ctx.answerCbQuery();
  });

  bot.on('forward_date', async (ctx) => {
    const { id, username = '', first_name } = ctx.message.forward_from!;

    Admins.push({ id, username, firstName: first_name, isSuper: false });

    await bot.telegram.sendMessage(
      ctx.message.forward_from!.id,
      `Hello ${first_name}! Now you are the admin of the @${ctx.botInfo.username} bot!`
    );

    await ctx.reply(
      `user ${first_name} ${
        username && `(@${username})`
      } successfully added to admin list.`,
      {
        reply_markup: {
          inline_keyboard: ChangeAdminsButtons,
        },
      }
    );
  });
}
