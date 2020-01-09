const BarmanModel = require('../models/BarmanModel');
let Barman = new BarmanModel();

class BarmansController {

    async errorHandler(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('500: UserRouter Error,');
    }

    async getBarmans( req, res, next ) {
      try {
         let barmans = await Barman.getBarmans();
         res.send( barmans );
     } catch ( error ) {
        console.log( error.message );
        res.send( error );
     }
    }

    async getBarmansWorkTime( req, res, next ) {
        try {
            let time = await Barman.getBarmansWorkTime( req.query.id );
            res.send( time );
        } catch ( error ) {
           console.log( error.message );
           res.send( error );
        }
    }

    async getBarmanById( req, res, next ) {
        try {
            let barman = await Barman.getBarmanById( req.query.id );
            res.send( barman );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    }

    async getBarmanByName( req, res, next ) {
        try {
            let barman = await Barman.getBarmanByName( req.query.name );
            res.send( barman );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    };

    async addBarman( req, res, next ) {
        try {
            let barmans = await Barman.addBarman( req.body.name );
            res.send( barmans );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    }

    async deleteBarman( req, res, next ) {
        try {
            let barman = await Barman.deleteBarman( req.body.id );
            res.send( barman );
        } catch ( error ) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    }
}

module.exports = BarmansController;
