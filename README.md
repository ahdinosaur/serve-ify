# serve-ify

serve [browserify](http://browserify.org) apps using [bankai](https://github.com/yoshuawuyts/bankai)

```shell
npm install --save serve-ify
```

## cli

### `serve-ify src [options]`

given:

- `src`: a `String` path to your app's entry file
- `options` an `options` that corresponds to
  - `options.port`: the port passed into [`server.listen`](https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback), defaults to `4000`
  - `options.logLevel`: the `level` passed into [`bole.output`](https://github.com/rvagg/bole#boleoutput)
  - `options.html`: passed [as `opts` to `bankai.html`](https://github.com/yoshuawuyts/bankai#bankaihtmlopts)
  - `options.css`: passed [as `opts` to `bankai.css`](https://github.com/yoshuawuyts/bankai#bankaicssopts)
  - `options.js`: passed [as `opts` to `bankai.js`](https://github.com/yoshuawuyts/bankai#bankaijsopts)

```shell
serve-ify ./client.js --port 4000 --logLevel=debug
```

## api

### `serveIfy = require('serve-ify')`

### `requestListener = serveIfy(src, options)`

given:

- `src`: a `String` path to your app's entry file
- `options` an `options` that corresponds to
  - `options.html`: passed [as `opts` to `bankai.html`](https://github.com/yoshuawuyts/bankai#bankaihtmlopts)
  - `options.css`: passed [as `opts` to `bankai.css`](https://github.com/yoshuawuyts/bankai#bankaicssopts)
  - `options.js`: passed [as `opts` to `bankai.js`](https://github.com/yoshuawuyts/bankai#bankaijsopts)

returns

- [`requestListener`](https://nodejs.org/api/http.html#http_event_request) to be passed into [`http.createServer`](https://nodejs.org/api/http.html#http_http_createserver_requestlistener), as in it accept two argument: `req` and `res`.

```js
const serveIfy = require('serve-ify')
const http = require('http')
const summary = require('server-summary')

const src = __dirname + '/client.js'
const requestListener = serveIfy(src)
const server = http.createServer(requestListener)

const port = 4000
server.listen(port, summary(server))
```
