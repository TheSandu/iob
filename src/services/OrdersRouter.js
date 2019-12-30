const express = require('express');
const OrdersController = require("../controllers/OrdersController");
const router = express.Router();

let Orders = new OrdersController();

router.use( Orders.errorHandler );

router.get('/', Orders.getOrders );

router.get('/order/id', Orders.getOrderById );

router.get('/order/place', Orders.getOrderByPlace );

router.get('/orders/place', Orders.getOrdersByPlace );

router.get('/order/place/desc', Orders.getOrderByPlaceDesc );

router.get('/orders/place/desc', Orders.getOrdersByPlaceDesc );

router.get('/orders/customerId', Orders.getOrdersByCustomerId );

router.get('/orders/barmanId', Orders.getOrdersByBarmanId );

router.get('/orders/groups', Orders.getGroupedOrders );

router.post('/add', Orders.addOrder );

router.post('/delete', Orders.deleteOrder );

module.exports = router;