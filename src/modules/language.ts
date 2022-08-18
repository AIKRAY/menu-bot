import { Telegraf } from 'telegraf';
import { LanguageButtons } from '../constants';

export function languageModule(bot: Telegraf) {
  bot.command('language', async (ctx) => {
    await ctx.reply('Choose your language:', {
      reply_markup: {
        inline_keyboard: LanguageButtons,
      },
    });
  });

  bot.action('btn-language', async (ctx) => {
    await ctx.reply('Choose your language:', {
      reply_markup: {
        inline_keyboard: LanguageButtons,
      },
    });

    ctx.answerCbQuery();
  });

  bot.action('language-en', async (ctx) => {
    ctx.reply('You have chosen English!');
    ctx.answerCbQuery();
  });

  bot.action('language-ka', async (ctx) => {
    ctx.reply('შენ აირჩიე ქართული ენა!');
    ctx.answerCbQuery();
  });

  bot.action('language-ru', async (ctx) => {
    ctx.reply('Вы выбрали русский язык!');
    ctx.answerCbQuery();
  });
}
