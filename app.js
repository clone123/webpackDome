var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cons = require('consolidate');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware')
var webpackConfig = require('./bin/webpack.dev.config')

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.engine('hbs', cons.handlebars)
app.set('views', path.join(__dirname, 'views'))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// 引入webpack hot middleware
if (app.get('env') === 'development') {
  // 如果处于development环境则加载 webpack hot reoload 中间件
//  console.log(webpackConfig.module.loaders)
  var compiler = webpack(webpackConfig)
  var devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: '/public/dist/',
    stats: {
      colors: true,
      chunks: false
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  })
  var hotMiddleware = webpackHotMiddleware(compiler)
  app.use(devMiddleware)
  app.use(hotMiddleware)
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//app.use(express.static(path.join(__dirname, 'public')));

// 静态文件
app.use('/public', express.static(path.join(__dirname, './public')));
app.use('/modules', express.static(path.join(__dirname,'./node_modules')));

// 挂载路由
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error.hbs', {
      message: err.message,
      error: err
    })
  })
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error.hbs', {
      message: err.message,
      error: {}
    })
  })
}

module.exports = app;
