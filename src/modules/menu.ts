import { Telegraf } from 'telegraf';
import { DishMenu, EditDishKeyboard, NewDish } from '../constants';
import {
  replyWithMenu,
  getMenuControls,
  getMenuControlsForNewDish,
  setDishForEdit,
  dishForEdit,
  editDishName,
  editDishDescription,
  editDishPrice,
  editDishPhoto,
  getDishById,
  replyWithDish,
} from '../helpers';
import {
  addDishDescription,
  addDishName,
  addDishPhoto,
  addDishPrice,
  addDishToDishMenu,
  isReadyForDishDescription,
  isReadyForDishImage,
  isReadyForDishName,
  isReadyForDishPrice,
  readyForDishDescription,
  readyForDishImg,
  readyForDishName,
  readyForDishPrice,
} from '../helpers';
import { Dish } from '../types';

export function menuModule(bot: Telegraf) {
  bot.command('menu', async (ctx) => {
    await replyWithMenu(bot, ctx);
  });

  bot.action('btn-menu', async (ctx) => {
    await replyWithMenu(bot, ctx);
    await ctx.answerCbQuery();
  });

  bot.action('add-dish', async (ctx) => {
    readyForDishName(true);
    await ctx.reply('Send the dish name');
    await ctx.answerCbQuery();
  });

  bot.action('edit-menu', async (ctx) => {
    for (const dish of DishMenu) {
      await replyWithDish(ctx, dish, getMenuControls(dish));
    }

    await ctx.answerCbQuery();
  });

  bot.action(/toggle-dish (.+)/, async (ctx) => {
    const dishId = Number(ctx.match[1]);

    DishMenu.forEach((dish) => {
      if (dish.id === dishId) {
        dish.hidden = !dish.hidden;
        ctx.editMessageReplyMarkup(getMenuControls(dish));
      }
    });

    await ctx.answerCbQuery();
  });

  bot.action(/edit-dish (.+)/, async (ctx) => {
    const dishForEdit = getDishById(Number(ctx.match[1]));
    setDishForEdit(dishForEdit);
    readyForDishName(true);

    await ctx.replyWithHTML('What do you want to change?', {
      reply_markup: {
        inline_keyboard: EditDishKeyboard,
      },
    });
    await ctx.answerCbQuery();
  });

  bot.action(/delete-dish (.+)/, async (ctx) => {
    const dishId = Number(ctx.match[1]);
    const index = DishMenu.findIndex((dish) => dish.id === dishId);

    if (index > -1) {
      const dishToRemove = DishMenu[index];
      DishMenu.splice(index, 1);
      await ctx.deleteMessage();
      await ctx.reply(`Dish ${dishToRemove.name} has been removed`);
    }

    await ctx.answerCbQuery();
  });

  bot.action('edit-name', async (ctx) => {
    console.log('test');
    readyForDishName(true);
    await ctx.reply('Send the dish name');
    await ctx.answerCbQuery();
  });

  bot.action('edit-description', async (ctx) => {
    readyForDishDescription(true);
    await ctx.reply('Send the dish description');
    await ctx.answerCbQuery();
  });

  bot.action('edit-img', async (ctx) => {
    readyForDishImg(true);
    await ctx.reply('Send the dish photo');
    await ctx.answerCbQuery();
  });

  bot.action('edit-price', async (ctx) => {
    readyForDishPrice(true);
    await ctx.reply('Send the dish price');
    await ctx.answerCbQuery();
  });

  bot.on('text', async (ctx, next) => {
    if (isReadyForDishName) {
      if (dishForEdit) {
        editDishName(dishForEdit, ctx.message.text);
        await ctx.reply('Your dish has been updated successfully');
        await replyWithDish(ctx, dishForEdit, getMenuControls(dishForEdit));
        setDishForEdit(undefined);
      } else {
        addDishName(ctx.message.text);
        readyForDishName(false);
        readyForDishDescription(true);
        await ctx.reply('Send the dish description');
        console.log('else', dishForEdit);
      }

      return;
    }

    if (isReadyForDishDescription) {
      if (dishForEdit) {
        editDishDescription(dishForEdit, ctx.message.text);
        await ctx.reply('Your dish has been updated successfully');
        await replyWithDish(ctx, dishForEdit, getMenuControls(dishForEdit));
        setDishForEdit(undefined);
      } else {
        addDishDescription(ctx.message.text);
        readyForDishDescription(false);
        readyForDishImg(true);
        await ctx.reply('Send the dish image');
        return;
      }
    }

    if (isReadyForDishPrice) {
      if (dishForEdit) {
        editDishPrice(dishForEdit, ctx.message.text);
        await ctx.reply('Your dish has been updated successfully');
        await replyWithDish(ctx, dishForEdit, getMenuControls(dishForEdit));
        setDishForEdit(undefined);
      } else {
        addDishPrice(ctx.message.text);
        addDishToDishMenu();
        readyForDishPrice(false);

        await ctx.reply('Your dish has been added successfully');
        await replyWithDish(
          ctx,
          NewDish as Dish,
          getMenuControlsForNewDish(NewDish as Dish)
        );

        return;
      }
    }

    next();
  });

  bot.on('photo', async (ctx) => {
    if (isReadyForDishImage) {
      const fileLink = await ctx.telegram.getFileLink(
        ctx.message.photo[ctx.message.photo.length - 1].file_id
      );

      if (dishForEdit) {
        editDishPhoto(dishForEdit, fileLink);
        await ctx.reply('Your dish has been updated successfully');
        await replyWithDish(ctx, dishForEdit, getMenuControls(dishForEdit));
        setDishForEdit(undefined);
      } else {
        addDishPhoto(fileLink);
        readyForDishImg(false);
        readyForDishPrice(true);
        await ctx.reply('Send the dish price');
      }
    }
  });
}
