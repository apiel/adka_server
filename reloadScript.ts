import { WebSocket } from 'https://deno.land/std/ws/mod.ts';

import { wsPathname, socks } from './wsMiddleware.ts';
import { helpers } from './deps.ts';

const reloadKey = 'reload';

export const script = (port: number) => `<script>
const ws = new WebSocket('ws://127.0.0.1:${port}${wsPathname}');
ws.onmessage = ({ data }) => {
    if (data.startsWith('${reloadKey}')) {
        const pos = data.indexOf('/');
        if (pos === -1 || data.substr(pos) === location.pathname) {
            location.reload();
        }
    }
}
</script>`;

export async function reloadAll(pathname?: string) {
    for (const sock of socks) {
        await reload(sock, pathname);
    }
}

export function reload(sock: WebSocket, pathname?: string) {
    return sock.send(`${reloadKey}${pathname}`);
}

export async function reloadMiddleware(ctx: any, next: any) {
    if (ctx.request.url.pathname !== '/adka-live-reload') {
        return await next();
    }
    const { pathname } = helpers.getQuery(ctx, { mergeParams: true });
    reloadAll(pathname);
    ctx.response.body = `Reload pages ${socks.length}.`;
}
