const serverRouter = require('server-router')
const browserify = require('browserify')
const pullHttp = require('pull-http')
const logHttp = require('http-ndjson')
const sheetify = require('sheetify')
const pull = require('pull-stream')
const bankai = require('bankai')
const path = require('path')
const bole = require('bole')

module.exports = createRequestListener

function createRequestListener (src, options) {
  const log = bole('serve-ify:' + src)
  const router = createRouter(src, options)

  return function (req, res) {
    const setSize = logHttp(req, res, log.debug)
    const source = pullHttp.createSource(req, res)
    const through = router(req, res, setSize)
    const sink = pullHttp.createSink(req, res, setSize)
    pull(source, through, sink)
  }
}

function createRouter (src, options) {
  options = options || {}
  options.html = options.html || {}
  options.cwd = options.cwd || process.cwd()

  src = path.resolve(options.cwd, src)

  const router = serverRouter()

  const html = bankai.html(options.html)
  router.on('', pullHttp.intercept(html))

  const cssPath = options.html.css || '/bundle.css'
  const css = bankai.css(options.css)
  router.on(cssPath, pullHttp.intercept(css))

  const jsPath = options.html.js || '/bundle.js'
  const js = bankai.js(browserify, src, options.js)
  router.on(jsPath, pullHttp.intercept(js))

  return router
}
