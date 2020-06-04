# Adka server

HTTP file server with live reloading.

Simple HTTP server to serve your static files and watch for file changes. If a HTML file is served, a JavaScript snippet will be injected to automatically reload when an update is detected.

```sh
deno install -f --allow-read --allow-net https://raw.githubusercontent.com/apiel/adka_server/master/server.ts
# or without installation
deno run --allow-read --allow-net https://raw.githubusercontent.com/apiel/adka_server/master/server.ts
```

By default, it serve the current folder. You can as well specify the path as parameter:

```sh
server ./site
```

The default port is 8080. To specify the port `--port=3000`:

```sh
server ./site --port=3000
```

## Trigger reload

To manually trigger a reload, you can send a request to the entrypoint `/adka-live-reload`, e.g.:

```
http://127.0.0.1:8080/adka-live-reload
```

You can as well, specify the path to reload `/adka-live-reload?pathname=/the/page`, this will then only reload the pages with the pathname `/the/page`. `pathname` parameter is a regex, so `/adka-live-reload?pathname=/the` would also reload `/the/page`, while `/adka-live-reload?pathname=/the$` would not.

## Use the module

If you need to build your own live reloading server, you can use the Adka server module:

```ts
import { server } from 'https://raw.githubusercontent.com/apiel/adka_server/master/mod.ts';
server({ port: 3000, root: './site' });
```

In case you want to change the watching logic, you can as well implement your own watcher:

```ts
import { server, reloadAll } from 'https://raw.githubusercontent.com/apiel/adka_server/master/mod.ts';
server({ port: 3000, root: './site', watcher: async (root: string) => {
    // let's reload the browser every 5 sec
    setInterval(reloadAll, 5000);
} });
```
