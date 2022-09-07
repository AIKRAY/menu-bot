import { Context, Telegraf } from 'telegraf';
import { DishMenu, NewDish } from '../constants';
import {
  addDishDescription,
  addDishName,
  addDishPhoto,
  addDishPrice,
  addDishToDishMenu,
  getMenuItem,
  isReadyForDishDescription,
  isReadyForDishImage,
  isReadyForDishName,
  isReadyForDishPrice,
  readyForDishDescription,
  readyForDishImage,
  readyForDishName,
  readyForDishPrice,
} from '../helpers';
import { s3ServiceInstance } from '../services';
import { DishMenuItem } from '../types';

export function menuModule(bot: Telegraf) {
  bot.command('menu', async (ctx) => {
    await replyWithMenu(bot, ctx);
  });

  bot.action('btn-menu', async (ctx) => {
    await replyWithMenu(bot, ctx);
    await ctx.answerCbQuery();
  });

  bot.action('add-menu-item', async (ctx) => {
    readyForDishName(true);
    await ctx.reply('Send the dish name');
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
    // TODO: implement
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

  bot.on('text', async (ctx, next) => {
    if (isReadyForDishName) {
      addDishName(ctx.message.text);
      readyForDishName(false);
      readyForDishDescription(true);
      await ctx.reply('Send the dish description');
      return;
    }
    if (isReadyForDishDescription) {
      addDishDescription(ctx.message.text);
      readyForDishDescription(false);
      readyForDishImage(true);
      await ctx.reply('Send the dish image');
      return;
    }
    if (isReadyForDishPrice) {
      addDishPrice(ctx.message.text);
      addDishToDishMenu();
      readyForDishPrice(false);
      await ctx.reply('Your dish has been added successfully');

      const savedImg = await s3ServiceInstance.getImage(NewDish.img!);
      await bot.telegram.sendPhoto(
        ctx.chat!.id,
        // TODO: test if we can use just telegram server storage
        // 'AgACAgIAAxkBAAIHBWMY3aGn7u1qImhmEpPMZwAB1oPQVAACGMsxG5eXyUig-3xL3PuM7gEAAwIAA20AAykE', // file_id
        { source: savedImg as Buffer },
        {
          parse_mode: 'HTML',
          caption: getMenuItem(NewDish as DishMenuItem),
          reply_markup: getMenuControls(NewDish as DishMenuItem),
        }
      );
      return;
    }

    next();
  });

  bot.on('photo', async (ctx) => {
    if (isReadyForDishImage) {
      const fileLink = await ctx.telegram.getFileLink(
        ctx.message.photo[ctx.message.photo.length - 1].file_id
      );
      addDishPhoto(fileLink);
      readyForDishImage(false);
      readyForDishPrice(true);
      await ctx.reply('Send the dish price');
    }
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
