import { send, Context } from './deps.ts';
import { wsPathname } from './wsMiddleware.ts';

const script = (port: number) => `<script>
const ws = new WebSocket('ws://127.0.0.1:${port}${wsPathname}');
ws.onmessage = ({ data }) => data === 'reload' && location.reload();
</script>`;

export const staticMiddleware = (root: string, port: number) => async (context: Context) => {
    await send(context, context.request.url.pathname, {
        root,
        index: 'index.html',
    });
    if (context.response.body) {
        const buf = await Deno.readAll(context.response.body as any);
        let content = new TextDecoder().decode(buf);
        const isHtml = /<\/?[a-z][\s\S]*>/i.test(content);
        if (isHtml) {
            content = injectScript(content, script(port));
            context.response.headers.set(
                'Content-Length',
                String(content.length),
            );
        }
        context.response.body = content;
    }
};

function injectScript(source: string, script: string, tag = '</body>') {
    if (source.indexOf(tag) !== -1) {
        source = source.replace(tag, `${script}${tag}`);
    } else {
        source = `${source}${script}`;
    }
    return source;
}
