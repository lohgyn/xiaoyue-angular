const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 8080;

const isProduction = process.env.NODE_ENV === 'production';

app.use(express.static(path.join(__dirname, 'dist/xiaoyue-angular')), function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.get("/*", function (req, res) {

  res.sendFile("index.html", { root: "dist/xiaoyue-angular" });
});

app.listen(process.env.PORT || port, () => {
    console.log(`Production ${isProduction}`);
    console.log(`xiaoyue-angular app listening at http://localhost:${port}`)
});

