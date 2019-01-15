import * as methodOverride from 'method-override'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { attachHeaders } from './headers'

// import ioc to generate bindings
import './ioc'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride())

attachHeaders(app)

module.exports = app
