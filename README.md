# Adka server

Static file server with live reloading.

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
