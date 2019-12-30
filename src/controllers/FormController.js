const TimeTableModel = require('../models/TimeTableModel');
const BarmanModel = require("../models/BarmanModel");
const OrderModle = require("../models/OrderModel");

let Barmans = new BarmanModel();
let Order = new OrderModle();
let TimeTable = new TimeTableModel();
class FormController {

    async errorHandler(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('500: UserRouter Error,');
    }

    async homePage( req, res, next ) {
      try {

          let barmans = await Barmans.getBarmans();
          let ordersCount = [];

          for (const barman of barmans) {
            let orders = await Order.getOrdersByBarmanId( barman._id );
            ordersCount.push( orders.length );
          }

          barmans = barmans.map( barman => barman.name );

        return res.render( "home-page.ejs", { barmans: barmans, ordersCount: ordersCount } );
     } catch ( error ) {
        console.log( error.message );
        res.send( error );
     }
    }

    async addtimeTablePage( req, res, next ) {
        try {
            let timeTableItems = await TimeTable.addTimeTableItem( req.body.date, req.body.table, req.body.place, req.body.barmanId );
            return res.render( "success-page.ejs", { message: 'Orar a fost inserat' } );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    }

    async addOrderPage( req, res, next ) {
        try {
            let order = await Order.addOrder( req.body.table, req.body.place, req.body.state );
            return res.render( "success-page.ejs", { message: 'Comanda a fost inserata' } );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    }

    async addBarmanPage( req, res, next ) {
        try {
            let barmans = await Barman.addBarman( req.body.name );
            return res.render( "success-page.ejs", { message: 'Chelderul a fost inserat' } );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    }

    async getAllTimeTable( req, res, next ) {
        try {

            let barmans = await Barmans.getBarmans();
            let barmansTimeTable = [];
            for (const barman of barmans) {
               let timeTables = await TimeTable.getTimeTableItemsByBarmanId( barman._id );
               barmansTimeTable.push({
                  barman_name: barman.name,
                  timeTables: timeTables
               });                  
            }
            return res.render( "timeTableList-page.ejs", { barmansTimeTable: barmansTimeTable } );
         } catch ( error ) {
            console.log( error.message );
            res.send( error );
         }
    }

}

module.exports = FormController;
