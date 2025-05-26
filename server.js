const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database.js');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', require('./routes'));

mongodb.initDB((err) => {
    if(err) {
        console.error(err);
    } else {
        app.listen(port, () => {
          console.log(`Database listening and Server is running on port ${port}`);
        });
    }
})
