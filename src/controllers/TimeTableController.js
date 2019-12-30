const TimeTableModel = require('../models/TimeTableModel');
let TimeTable = new TimeTableModel();

class BarmansController {

    async errorHandler(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('500: UserRouter Error,');
    }

    async getTimeTable( req, res, next ) {
      try {
         let timeTable = await TimeTable.getTimeTable();
         res.send( timeTable );
     } catch ( error ) {
        console.log( error.message );
        res.send( error );
     }
    }

    async getTimeTableItem( req, res, next ) {
        try {
            let timeTableItem = await TimeTable.getTimeTableItem( req.query.date, req.query.table, req.query.place );
            res.send( timeTableItem );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    }

    async getTimeTableItemById( req, res, next ) {
        try {
            let timeTableItem = await TimeTable.getTimeTableItemById( req.query.id );
            res.send( timeTableItem );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    };
    
    async getTimeTableItemsByDate( req, res, next ) {
        try {
            let timeTableItems = await TimeTable.getTimeTableItemsByDate( req.query.date );
            res.send( timeTableItems );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    };

    async getTimeTableItemsByPlace( req, res, next ) {
        try {
            let timeTableItems = await TimeTable.getTimeTableItemsByPlace( req.query.table, req.query.place );
            res.send( timeTableItems );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    };

    async getTimeTableItemsByBarmanId( req, res, next ) {
        try {
            let timeTableItems = await TimeTable.getTimeTableItemsByBarmanId( req.query.barmanId );
            res.send( timeTableItems );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    }; 

    async addTimeTableItem( req, res, next ) {
        try {
            let timeTableItems = await TimeTable.addTimeTableItem( req.body.date, req.body.table, req.body.place, req.body.barmanId );
            res.send( timeTableItems );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    }

    async deleteTimeTableItem( req, res, next ) {
        try {
            let timeTableItem = await TimeTable.deleteTimeTableItem( req.body.id );
            res.send( timeTableItem );
        } catch ( error ) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    }
}

module.exports = BarmansController;
