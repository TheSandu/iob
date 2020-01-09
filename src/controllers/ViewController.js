const TimeTableModel = require('../models/TimeTableModel');
const BarmanModel = require("../models/BarmanModel");
const OrderModle = require("../models/OrderModel");

let Barmans = new BarmanModel();
let Order = new OrderModle();
let TimeTable = new TimeTableModel();
class ViewController {

    async errorHandler(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('500: UserRouter Error,');
    }

    async homePage( req, res, next ) {
      try {

         let barmans = await Barmans.getBarmans();
         let timeMinutes = [];

         for (const barman of barmans) {
           let work = await Barmans.getBarmansWorkTime( barman._id );
           timeMinutes.push( work.time );
         }

         let barmanDiscounts = [];
         for (const barman of barmans) {
           let discount = await Barmans.getBarmansDiscountWorkTime( barman._id );
           barmanDiscounts.push( discount );
         }

         barmans = barmans.map( barman => barman.name );

        return res.render( "home-page.ejs", { barmans: barmans, barmanDiscounts: barmanDiscounts,timeMinutes: timeMinutes } );
     } catch ( error ) {
        console.log( error.message );
        res.send( error );
     }
    }

    async addtimeTablePage( req, res, next ) {
        try {
          let barmans = await Barmans.getBarmans();
          return res.render( "timeTable-page.ejs", { barmans: barmans } );
       } catch ( error ) {
          console.log( error.message );
          res.send( error );
       }
    }

    async addOrderPage( req, res, next ) {
        try {
          return res.render( "order-page.ejs" );
       } catch ( error ) {
          console.log( error.message );
          res.send( error );
       }
    }

    async addBarmanPage( req, res, next ) {
      try {
         return res.render( "barman-page.ejs" );
      } catch ( error ) {
         console.log( error.message );
         res.send( error );
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

module.exports = ViewController;
