import { Application, send, error, info } from './deps.ts';
import { wsMiddleware, sendLiveReload } from './wsMiddleware.ts';
import { staticMiddleware } from './staticMiddleware.ts';

export interface Options {
    port: number;
    root: string;
}

let timer: number;
const INTERVAL = 250;

export async function server({ port, root }: Options) {
    const app = new Application();

    app.addEventListener('error', (evt) => {
        error('Something went wrong', evt.error);
    });

    app.use(wsMiddleware);
    app.use(staticMiddleware(root));

    info(`Server started listening on port ${port}`);
    app.listen({ port });
    watch(root);
}

async function watch(root: string) {
    info(`Watch for file changes ${root}`);
    const watcher = Deno.watchFs(root, { recursive: true });
    for await (const event of watcher) {
        clearTimeout(timer);
        timer = setTimeout(sendLiveReload, INTERVAL);
    }
}
