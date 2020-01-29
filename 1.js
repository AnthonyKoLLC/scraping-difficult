
const express = require('express');
const bodyParser = require('body-parser');
const Routes = require('./router');
const app = express();
app.use( bodyParser.json({limit: '50mb'}) );

app.use('/', Routes);

app.listen(3000);