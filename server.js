const colors = require("./consoleStyle");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const OrdersRouter = require("./src/services/OrdersRouter");
const BarmansRouter = require("./src/services/BarmansRouter");
const TimeTableRouter = require("./src/services/TimeTableRouter");
const ViewRouter = require("./src/services/ViewRouter");

const config = require("./config");
const PORT = config.PORT || 3000;
const HOST = config.HOST || "127.0.0.1";

const path = require('path');

app.set( "view engine", "ejs" );
app.set('views', path.dirname( __dirname ) + "/iob/src/views" );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(( req, res, next ) => {
    console.log(`Request: ${ colors.Blue }${req.protocol}${ colors.Reset }://${ colors.Blue }${ HOST }${ colors.Reset }:${ colors.Blue }${ PORT }${req.originalUrl}${ colors.Reset }`);
    next();
});
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/app', ViewRouter);

app.use('/v1/orders', OrdersRouter);

app.use('/v1/barmans', BarmansRouter);

app.use('/v1/timeTable', TimeTableRouter);

app.use('/', ( req, res, next ) => {
    res.send({ status: `Server run on: ${ HOST }:${ PORT }` });
});

app.listen( PORT, HOST, ( ) => {
    console.log("+-----------------------------------");
    console.log(`|Server run on: ${ HOST }${ colors.Reset }:${ colors.Green }${ PORT }${ colors.Reset }`);
});