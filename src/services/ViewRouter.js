const express = require('express');
const ViewController = require("../controllers/ViewController");
const FormControler = require("../controllers/FormController");
const router = express.Router();

let View = new ViewController();
let Form = new FormControler();

router.use( View.errorHandler );

router.get('/', View.homePage );

router.get('/timeTable', View.addtimeTablePage );

router.get('/allTimeTable', View.getAllTimeTable );

router.get('/addBarman', View.addBarmanPage );

router.get('/addOrder', View.addOrderPage );

//------------------------------------------------------------

router.post('/success/timeTable', Form.addtimeTablePage );

router.post('/success/addBarman', Form.addBarmanPage );

router.post('/success/addOrder', Form.addOrderPage );

module.exports = router;