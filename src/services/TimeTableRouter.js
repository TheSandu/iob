const express = require('express');
const TimeTableController = require("../controllers/TimeTableController");
const router = express.Router();

let TimeTable = new TimeTableController();

router.use( TimeTable.errorHandler );

router.get('/', TimeTable.getTimeTable );

router.get('/item', TimeTable.getTimeTableItem );

router.get('/item/id', TimeTable.getTimeTableItemById );

router.get('/items/date', TimeTable.getTimeTableItemsByDate );

router.get('/items/place', TimeTable.getTimeTableItemsByPlace );

router.post('/add', TimeTable.addTimeTableItem );

router.post('/delete', TimeTable.deleteTimeTableItem );

module.exports = router;