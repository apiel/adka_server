import { Application, send, error, info } from './deps.ts';
import { wsMiddleware } from './wsMiddleware.ts';

export interface Options {
    port: number;
    root: string;
}

export async function server({ port, root }: Options) {
    const app = new Application();

    app.addEventListener('error', (evt) => {
        error('Something went wrong', evt.error);
    });

    app.use(wsMiddleware);

    app.use(async (context) => {
        await send(context, context.request.url.pathname, {
            root,
            index: 'index.html',
        });
    });

    info(`Server started listening on port ${port}`);
    await app.listen({ port });
}
