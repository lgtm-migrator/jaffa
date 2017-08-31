var express = require('express')
var path = require('path') // core
var sass = require('node-sass-middleware')
var app = module.exports = express()


app.set('view engine', 'pug')
app.set('json spaces', 2)
app.locals.pretty = true

/* Static & SCSS setup */
app.use(sass({
  src: path.join(__dirname, 'public'),
  includePaths: [
    path.join(__dirname, 'node_modules', 'govuk_frontend_toolkit', 'stylesheets'),
    path.join(__dirname, 'node_modules', 'govuk-elements-sass', 'public', 'sass')
  ]
}))
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', express.static(path.join(__dirname, 'node_modules', 'govuk_frontend_toolkit', 'images')))


require('./routes')

app.listen(process.env.PORT || 3000)
