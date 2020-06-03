import { config as dotenv } from 'https://deno.land/x/dotenv/mod.ts';
import { existsSync } from 'https://deno.land/std/fs/exists.ts';
import { join, resolve } from 'https://deno.land/std/path/mod.ts';

export const ROOT_FOLDER = Deno.env.get('ADKA_ROOT_FOLDER')
    ? resolve(Deno.env.get('ADKA_ROOT_FOLDER')!)
    : Deno.cwd();

if (existsSync(join(Deno.cwd(), '.env'))) {
    dotenv({ export: true });
}
const env = Deno.env.toObject();

export let config = {
    distStatic: env.ADKA_DIST_FOLDER || 'site',
    port: env.ADKA_PORT ? Number(env.ADKA_PORT) : 8080,
};

export let paths = {
    distStatic: '',
};
initPaths();

export function setConfig(newConfig = {}) {
    config = { ...config, ...newConfig };
    initPaths();
}

function initPaths() {
    const distStatic = join(ROOT_FOLDER, config.distStatic);
    paths = {
        distStatic,
    };
}
