const express = require('express');
const app = express();
const path = require('path');

const port = 8080;

app.use(express.static(path.join(__dirname, 'dist/xiaoyue-angular')));

app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: "dist/xiaoyue-angular" });
});

app.listen(process.env.PORT || port, () => {
    console.log(`xiaoyue-angular app listening at http://localhost:${port}`)
});
