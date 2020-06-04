import { WebSocket } from 'https://deno.land/std/ws/mod.ts';

export const socks: WebSocket[] = [];

export const wsPathname = '/adkaLiveWS';

export async function wsMiddleware(ctx: any, next: any) {
    if (ctx.request.url.pathname !== wsPathname) {
        return await next();
    }
    const sock = await ctx.upgrade();
    let id = socks.push(sock) - 1;
    for await (const ev of sock);
    socks.splice(id, 1);
}
