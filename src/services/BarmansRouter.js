const express = require('express');
const BarmansController = require("../controllers/BarmansController");
const router = express.Router();

let Barmans = new BarmansController();

router.use( Barmans.errorHandler );

router.get('/', Barmans.getBarmans );

router.get('/id', Barmans.getBarmanById );

router.get('/name', Barmans.getBarmanByName );

router.get('/workTime', Barmans.getBarmansWorkTime );

router.post('/add', Barmans.addBarman );

router.post('/delete', Barmans.deleteBarman );

module.exports = router;

