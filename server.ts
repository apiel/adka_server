import { server } from './mod.ts';
import { config, paths } from './config.ts';

server({ port: config.port, root: paths.distStatic });
