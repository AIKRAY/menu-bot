import { Context } from 'telegraf';
import { AdminKeyboard } from '../constants';
import { isAdmin } from './common';

export function replyWithAdminKeyboard(ctx: Context) {
  if (isAdmin(ctx.from!.id)) {
    return ctx.reply('Choose an action:', {
      reply_markup: {
        inline_keyboard: AdminKeyboard,
      },
    });
  }

  return ctx.reply(`You don't have administrator permissions.`);
}
