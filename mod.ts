import { Application, error, info, log } from './deps.ts';
import { wsMiddleware } from './wsMiddleware.ts';
import { staticMiddleware } from './staticMiddleware.ts';
import { Options } from './types.ts';
import { reloadAll, reloadMiddleware } from './reloadScript.ts';

export { Options, reloadAll };

let timer: number;
const INTERVAL = 250;

export async function server(options: Options) {
    const { port, root, watcher = watch, debug = false } = options;
    const app = new Application();

    // Logger
    app.use(async (ctx, next) => {
        log(`${ctx.request.method} ${ctx.request.url}`);
        await next();
    });

    app.addEventListener('error', (evt) => {
        error(
            evt.context?.request.url.href,
            debug ? evt.error : evt.error.message,
        );
    });

    app.use(reloadMiddleware);
    app.use(wsMiddleware);
    app.use(staticMiddleware(options));

    info(`Server started listening on port ${port}`);
    app.listen({ port });
    watcher && watcher(root);
}

export async function watch(root: string) {
    info(`Watch for file changes ${root}`);
    const watcher = Deno.watchFs(root, { recursive: true });
    for await (const event of watcher) {
        clearTimeout(timer);
        timer = setTimeout(reloadAll, INTERVAL);
    }
}
