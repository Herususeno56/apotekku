const express = require("express");
const app = express();
const port = 5000;
const getRouter = require('./routes/router')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', getRouter)

app.listen(port, function () {
  console.log(`Berhasil Running : ${port}`);
});
