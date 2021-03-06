const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/iob', { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

const TimeTableModel = require("../models/TimeTableModel");
let TimeTable = new TimeTableModel();

const OrderSchema = new Schema({
    _id: Schema.Types.ObjectId,
    customer_id: Schema.Types.ObjectId,
    table: Number,
    place: Number,
    state: { type: String, enum: [ "Refill", "Fill", "Change","Finish" ] },
    barman_id: Schema.Types.ObjectId,
    create_date: { type: Date, default: Date.now() },
});

let OrderModel = mongoose.model( 'orders', OrderSchema );

const OrderAggregate = OrderModel.aggregate();

class Order {
    async getOrders( ) {
        return await OrderModel.find();
    }

    async getOrderById( id ) {
        return await OrderModel.findOne({ _id: id });
    }

    async getOrderByPlace( table, place ) {
        return await OrderModel.findOne({ table: table, place: place });
    }

    async getOrdersByPlace( table, place ) {
        return await OrderModel.find({ table: table, place: place });
    }

    async getOrderByPlaceDesc( table, place ) {
        return await OrderModel.findOne({ table: table, place: place }).sort({create_date: 'desc'});
    }

    async getOrdersByPlaceDesc( table, place ) {
        return await OrderModel.find({ table: table, place: place }).sort({create_date: 'desc'});
    }

    async getOrdersByCustomerId( customer_id ) {
        return await OrderModel.find({ customer_id: customer_id });
    }

    async getGroupedOrders( ) {
        return await OrderModel.aggregate([{ $group: { _id:"$customer_id", items:{ $push: { state:"$state", create_date: "$create_date" } } } }]);
    }

    async getOrdersByBarmanId( barmanId ) {
        return await OrderModel.find({ barman_id: barmanId });
    }

    async addOrder( table, place, state ) {
        let lastOrder = await this.getOrderByPlaceDesc( table, place );
        let customer_id;
        let barmanId;

        if( !lastOrder || lastOrder.state == "Finish" ) {
            customer_id = new mongoose.Types.ObjectId();

            let date = new Date();
            let timeTable = await TimeTable.getTimeTableItem( `${ date.getFullYear() }-${ date.getMonth() + 1 }-${ date.getDate() }`, table, place );
            if( !timeTable )
                return "Barman is not deffined";
            barmanId = timeTable.barman_id;
        }
        else {
            customer_id = lastOrder.customer_id;
            barmanId = lastOrder.barman_id;
        }

        let order = new OrderModel({
            _id: new mongoose.Types.ObjectId(),
            customer_id: customer_id,
            table: table,
            place: place,
            state: state,
            barman_id: barmanId,
        });

        order.save();
        return order;
    }

    async deleteOrder ( id ) {
        let order = await OrderModel.deleteOne({ _id: id });
        return order;
    }
}

module.exports = Order;