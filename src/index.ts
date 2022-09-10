import { Telegraf } from 'telegraf';
import {
  AdminBotMenu,
  AdminBotMenuKeyboard,
  BotMenu,
  BotMenuKeyboard,
} from './constants';
import {
  dishDescriptionMiddleware,
  dishImageMiddleware,
  dishNameMiddleware,
  dishPriceMiddleware,
  isAdmin,
  newAdminMiddleware,
} from './helpers';
import {
  menuModule,
  languageModule,
  aboutModule,
  adminModule,
} from './modules';

const bot = new Telegraf('5459712119:AAF7YNTdP2QzTRY5AD0lXaTvKXC_ERgOJIk');

bot.use(newAdminMiddleware());
bot.use(dishNameMiddleware());
bot.use(dishDescriptionMiddleware());
bot.use(dishImageMiddleware());
bot.use(dishPriceMiddleware());

bot.start(async (ctx) => {
  await ctx.reply('Choose an option:', {
    reply_markup: {
      inline_keyboard: isAdmin(ctx.from.id)
        ? AdminBotMenuKeyboard
        : BotMenuKeyboard,
    },
  });
  await bot.telegram.deleteMyCommands();
  await bot.telegram.setMyCommands(
    isAdmin(ctx.from.id) ? AdminBotMenu : BotMenu
  );
});

menuModule(bot);
languageModule(bot);
aboutModule(bot);
adminModule(bot);

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
