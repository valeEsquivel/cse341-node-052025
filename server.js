const express = require('express');
const mongodb = require('./data/database.js');
const app = express();

const port = process.env.PORT || 3000;

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
