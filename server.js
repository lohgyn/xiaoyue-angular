const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 8080;

const isProduction = process.env.NODE_ENV === 'production';

app.use(express.static(path.join(__dirname, 'dist/xiaoyue-angular')));

app.get("/*", function (req, res) {

  res.sendFile("index.html", { root: "dist/xiaoyue-angular" });
});

var listener = app.listen(process.env.PORT || port, () => {
  
    console.log(`Production ${isProduction}`);
    console.info(`xiaoyue-angular app listening at address ${listener.address().address}, port ${listener.address().port}`)
});

