const OrderModel = require('../models/OrderModel');
let Order = new OrderModel();

class OrdersController {

    async errorHandler(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('500: UserRouter Error,');
    }

    async getOrders( req, res, next ) {
      try {
         let orders = await Order.getOrders();
         res.send( orders );
     } catch ( error ) {
        console.log( error.message );
        res.send( error );
     }
    }

    async getOrderById( req, res, next ) {
        try {
            let order = await Order.getOrderById( req.query.id );
            res.send( order );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    }

    async getOrderByPlace( req, res, next ) {
        try {
            let order = await Order.getOrderById( req.query.table, req.query.place );
            res.send( order );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    };

    async getOrdersByPlace( req, res, next ) {
        try {
            let orders = await Order.getOrdersByPlace( req.query.table, req.query.place );
            res.send( orders );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    }

    async getOrderByPlaceDesc( req, res, next ) {
        try {
            let order = await Order.getOrderByPlaceDesc( req.query.table, req.query.place );
            res.send( order );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    };

    async getOrdersByPlaceDesc( req, res, next ) {
        try {
            let orders = await Order.getOrdersByPlaceDesc( req.query.table, req.query.place );
            res.send( orders );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    }

    async getOrdersByCustomerId( req, res, next ) {
        try {
            let orders = await Order.getOrdersByCustomerId( req.query.customerId );
            res.send( orders );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    }

    async getGroupedOrders( req, res, next ) {
        try {
            let orders = await Order.getGroupedOrders( );
            res.send( orders );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    }

    async getOrdersByBarmanId( req, res, next ) {
        try {
            let orders = await Order.getOrdersByBarmanId( req.body.barmanId );
            res.send( orders );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    }

    async addOrder( req, res, next ) {
        try {
            let order = await Order.addOrder( req.body.table, req.body.place, req.body.state );
            res.send( order );
        } catch (error) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    }

    async deleteOrder( req, res, next ) {
        try {
            let order = await Order.deleteOrder( req.body.id );
            res.send( order );
        } catch ( error ) {
            console.log( error.message );
            res.send({ error: error.message });
        }
    }
}

module.exports = OrdersController;
