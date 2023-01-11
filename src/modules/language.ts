import { Telegraf } from 'telegraf';
import { LanguageKeyboard } from '../constants';

export function languageModule(bot: Telegraf) {
  bot.command('language', async (ctx) => {
    await ctx.reply('Choose your language:', {
      reply_markup: {
        inline_keyboard: LanguageKeyboard,
      },
    });
  });

  bot.action('btn-language', async (ctx) => {
    await ctx.reply('Choose your language:', {
      reply_markup: {
        inline_keyboard: LanguageKeyboard,
      },
    });

    await ctx.answerCbQuery();
  });

  bot.action('language-en', async (ctx) => {
    await ctx.reply('You have chosen English!');
    await ctx.answerCbQuery();
  });

  bot.action('language-ka', async (ctx) => {
    await ctx.reply('შენ აირჩიე ქართული ენა!');
    await ctx.answerCbQuery();
  });

  bot.action('language-ru', async (ctx) => {
    await ctx.reply('Вы выбрали русский язык!');
    await ctx.answerCbQuery();
  });
}
