let socks: any = [];
export async function wsMiddleware(ctx: any, next: any) {
    if (ctx.request.url.pathname !== '/adkaLiveWS') {
        return await next();
    }
    const sock = await ctx.upgrade();
    let idx = socks.push(sock) - 1;
    for await (const ev of sock) {
        if (typeof ev === 'string') {
            // text message
            console.log('ws:Text', ev);
            await sock.send(ev);
        }
    }
    socks.splice(idx, 1);
}

export async function sendLiveReload() {
    for (const sock of socks) {
        await sock.send('reload');
        // await sock.close(1000);
    }
};
