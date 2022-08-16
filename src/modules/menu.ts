import { Telegraf } from 'telegraf';
import { LastMsgStore } from '../types';
import { deleteLastMsg } from '../helpers';

export const menu = [
  {
    name: 'Chashushuli',
    description: 'Traditional Georgian Soup',
    img: 'https://georgianjournal.ge/media/_thumb/images/georgianews/2016/October/Cuisine/cane.jpg',
    price: 6,
  },
  {
    name: 'Chashushuli',
    description: 'Traditional Georgian Soup',
    img: 'https://georgianjournal.ge/media/_thumb/images/georgianews/2016/October/Cuisine/cane.jpg',
    price: 6,
  },
  {
    name: 'Chashushuli',
    description: 'Traditional Georgian Soup',
    img: 'https://georgianjournal.ge/media/_thumb/images/georgianews/2016/October/Cuisine/cane.jpg',
    price: 6,
  },
];

export function menuModule(bot: Telegraf, msgStore: LastMsgStore) {
  bot.action('btn-menu', async (ctx) => {
    await deleteLastMsg(ctx, msgStore);

    msgStore[ctx.chat!.id] = [];

    for (const item of menu) {
      const msg = await bot.telegram.sendPhoto(ctx.chat!.id, `${item.img}`, {
        parse_mode: 'HTML',
        caption: `<b>${item.name}</b>
<i>${item.description}</i>
${item.price} GEL
          `,
      });

      (msgStore[ctx.chat!.id] as number[]).push(msg.message_id);
    }

    ctx.answerCbQuery();
  });

  bot.command('menu', async (ctx) => {
    await deleteLastMsg(ctx, msgStore);

    msgStore[ctx.chat!.id] = [];

    for (const item of menu) {
      const msg = await bot.telegram.sendPhoto(ctx.chat.id, `${item.img}`, {
        parse_mode: 'HTML',
        caption: `<b>${item.name}</b>
<i>${item.description}</i>
${item.price} GEL
          `,
      });

      (msgStore[ctx.chat!.id] as number[]).push(msg.message_id);
    }
  });
}
