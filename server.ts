import { server } from './mod.ts';

let root = Deno.cwd();
let port = 8080;

const portParam = '--port=';
Deno.args.forEach((arg: string) => {
    if (arg.startsWith(portParam)) {
        port = Number(arg.substr(portParam.length));
    } else {
        root = arg;
    }
});

server({ port, root });
