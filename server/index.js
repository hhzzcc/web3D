const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.resolve(__dirname, '../views')))


const port = 1234;
app.listen(port, () => {
    console.log(`success in localhost:${port}`)
});