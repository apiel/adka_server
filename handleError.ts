import { join } from 'https://deno.land/std/path/mod.ts';
import { exists } from 'https://deno.land/std/fs/exists.ts';

import { Context, send } from './deps.ts';

export async function handleError(
    status: number,
    context: Context,
    root: string,
) {
    const path = `${status}.html`;
    const fileError = join(Deno.cwd(), root, path);
    if (await exists(fileError)) {
        await send(context, path, {
            root,
        });
        context.response.status = status;
        return true;
    }
    return false;
}
