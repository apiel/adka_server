import { send, Context } from './deps.ts';
import { script } from './reloadScript.ts';
import { Options } from './mod.ts';
import { handleError } from './handleError.ts';

export const staticMiddleware = ({
    root,
    port,
    htmlExt = /.+\.htm[l]?|\/$/,
}: Options) => async (context: Context) => {
    try {
        await send(context, context.request.url.pathname, {
            root,
            index: 'index.html',
        });
        if (
            context.response.body &&
            htmlExt.test(context.request.url.pathname)
        ) {
            const buf = await Deno.readAll(context.response.body as any);
            let content = new TextDecoder().decode(buf);
            content = injectScript(content, script(port));
            context.response.headers.set(
                'Content-Length',
                String(content.length),
            );
            context.response.body = content;
        }
    } catch (error) {
        if (!(await handleError(error.status, context, root))) {
            throw error;
        }
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
