import { Middleware, Context } from 'telegraf';
import { Message } from 'telegraf/typings/core/types/typegram';
import {
  isReadyForNewAdmin,
  readyForNewAdmin,
  isReadyForDishName,
  readyForDishName,
  isReadyForDishDescription,
  readyForDishDescription,
  isReadyForDishImage,
  readyForDishImage,
  isReadyForDishPrice,
  readyForDishPrice,
} from '../helpers';

export function newAdminMiddleware(): Middleware<Context> {
  return async (ctx, next) => {
    if (
      isReadyForNewAdmin &&
      !(ctx.message as Message.CommonMessage)?.forward_from
    ) {
      await replyWithInvalidMessageWarningText(ctx, 'adding an admin');
      readyForNewAdmin(false);
    }
    next();
  };
}

export function dishNameMiddleware(): Middleware<Context> {
  return async (ctx, next) => {
    if (isReadyForDishName && !(ctx.message as Message.TextMessage).text) {
      await replyWithInvalidMessageWarningText(ctx, 'adding a dish name');
      readyForDishName(false);
    }
    next();
  };
}

export function dishDescriptionMiddleware(): Middleware<Context> {
  return async (ctx, next) => {
    if (
      isReadyForDishDescription &&
      !(ctx.message as Message.TextMessage).text
    ) {
      await replyWithInvalidMessageWarningText(
        ctx,
        'adding a dish description'
      );
      readyForDishDescription(false);
    }
    next();
  };
}

export function dishImageMiddleware(): Middleware<Context> {
  return async (ctx, next) => {
    if (isReadyForDishImage && !(ctx.message as Message.PhotoMessage).photo) {
      await replyWithInvalidMessageWarningText(ctx, 'adding a dish image');
      readyForDishImage(false);
    }
    next();
  };
}

export function dishPriceMiddleware(): Middleware<Context> {
  return async (ctx, next) => {
    if (isReadyForDishPrice && !(ctx.message as Message.TextMessage).text) {
      await replyWithInvalidMessageWarningText(ctx, 'adding a dish price');
      readyForDishPrice(false);
    }
    next();
  };
}

function replyWithInvalidMessageWarningText(ctx: Context, processName: string) {
  return ctx.reply(
    `An invalid message was received. The process of ${processName} has been aborted.`
  );
}
