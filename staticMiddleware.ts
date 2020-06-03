import { send, Context } from './deps.ts';

export const staticMiddleware = (root: string) => async (context: Context) => {
    await send(context, context.request.url.pathname, {
        root,
        index: 'index.html',
    });
    if (context.response.body) {
        const buf = await Deno.readAll(context.response.body as any);
        const content = new TextDecoder().decode(buf);
        const isHtml = /<\/?[a-z][\s\S]*>/i.test(content);
        console.log('content', content, isHtml);
        context.response.body = content;
    }
};
