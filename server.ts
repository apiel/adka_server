import { server } from './mod.ts';

let root = Deno.cwd();
let port = 8080;
let debug = false;

const portParam = '--port=';
const debugParam = '--debug';
Deno.args.forEach((arg: string) => {
    if (arg.startsWith(debugParam)) {
        debug = true;
    } else if (arg.startsWith(portParam)) {
        port = Number(arg.substr(portParam.length));
    } else {
        root = arg;
    }
});

server({ port, root, debug });
