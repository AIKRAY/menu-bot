import { Context } from 'telegraf';
import { LastMsgStore } from './types/msg-store';

export async function deleteLastMsg(ctx: Context, msgStore: LastMsgStore) {
  try {
    if (ctx.chat && msgStore[ctx.chat.id]) {
      if (ctx.chat && typeof msgStore[ctx.chat.id] === 'number') {
        await ctx.deleteMessage(msgStore[ctx.chat!.id] as number);
      }

      if (ctx.chat && (msgStore[ctx.chat.id] as number[]).length) {
        for (const msg of msgStore[ctx.chat.id] as number[]) {
          await ctx.deleteMessage(msg);
        }
      }

      delete msgStore[ctx.chat!.id];
    }

    if (ctx.message?.message_id) {
      await ctx.deleteMessage();
    }
  } catch (error) {
    console.log('Error: ', error);
  }
}
