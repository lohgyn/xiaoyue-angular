var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, 'dist/xiaoyue-angular')));

app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: "dist/xiaoyue-angular" });
});

app.listen(process.env.PORT || 8080);