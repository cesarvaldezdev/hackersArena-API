

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const cors = require('cors')
const app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.enable('trust proxy');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
//app.use(cors({origin: '*'}));

process.env.PORT = process.env.PORT || 8080;
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
  console.log('Press Ctrl+C to quit.');
});
