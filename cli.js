#!/usr/bin/env node

const minimist = require('minimist')
const summary = require('server-summary')
const bole = require('bole')
const http = require('http')
const serveIfy = require('./')

const argv = process.argv.slice(2)
const args = minimist(argv)

const port = args.port || 4000
const handler = serveIfy(args._[0], args)
const server = http.createServer(handler)

bole.output({ level: args.logLevel, stream: process.stdout })
server.listen(port, summary(server))
