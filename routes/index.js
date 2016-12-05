var path = require('path')
var fs = require('fs')
var express = require('express');
var router = express.Router();

function getWebpackAssets () {
  var assetsPath = path.join(__dirname, '../webpack-assets.json')

  if (!fs.existsSync(assetsPath))
    throw new Error('webpack 还未打包完成')
  return require(assetsPath)
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index.hbs', {
    webpackAssets: getWebpackAssets()
  })
})

module.exports = router;
