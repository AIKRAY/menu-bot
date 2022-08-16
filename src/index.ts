import { Telegraf } from 'telegraf';
import {
  AdminBotMenu,
  AdminBotMenuKeyboard,
  BotMenu,
  BotMenuKeyboard,
} from './constants';
import {
  menuModule,
  languageModule,
  helpModule,
  aboutModule,
  adminModule,
} from './modules';

const bot = new Telegraf('5459712119:AAF7YNTdP2QzTRY5AD0lXaTvKXC_ERgOJIk');

bot.start(async (ctx) => {
  if (ctx.from.id === 5391764441) {
    await ctx.reply('Choose an option:', {
      reply_markup: {
        inline_keyboard: AdminBotMenuKeyboard,
      },
    });
  } else {
    await ctx.reply('Choose an option:', {
      reply_markup: {
        inline_keyboard: BotMenuKeyboard,
      },
    });
  }

  await bot.telegram.deleteMyCommands();

  if (ctx.from.id === 5391764441) {
    await bot.telegram.setMyCommands(AdminBotMenu);
  } else {
    await bot.telegram.setMyCommands(BotMenu);
  }
});

menuModule(bot);
languageModule(bot);
helpModule(bot);
aboutModule(bot);
adminModule(bot);

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
