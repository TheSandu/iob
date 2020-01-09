const mongoose = require('mongoose')
const OrderModel = require("./OrderModel");
mongoose.connect('mongodb://localhost:27017/iob', { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

const BarmanSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    register_date: { type: Date, default: Date.now },
});

let BarmanModel = mongoose.model( 'barmans', BarmanSchema );

let Order = new OrderModel();

class Barman {
    async getBarmans( ) {
        return await BarmanModel.find();
    }

    async getBarmansDiscountWorkTime( id ) {
        let barman = await this.getBarmanById( id );
        let barmanOrders = await Order.getOrdersByBarmanId( barman._id );

        let timeMinutes = [0, 0, 0];

        if( !barmanOrders.length )
            return { id: id, name: barman.name, time: timeMinutes };

        for (let index = 0; index < barmanOrders.length; index += 2) {
            if( !barmanOrders[index] && !barmanOrders[index + 1] )
                break;

            if( barmanOrders[index].state == "Finish" )
                break;

            let fill = barmanOrders[index].create_date;
            let refill = barmanOrders[index + 1].create_date;
            let diference = Math.floor(( Math.abs(fill - refill) /1000)/60) ;

            if( diference < 5 )
                timeMinutes[0] +=  diference;
            else if( diference > 5 && diference < 10 )
                timeMinutes[1] +=  diference;
            else if( diference > 10 )
                timeMinutes[2] +=  diference;
        }

        return { id: id, name: barman.name, discountsTime: timeMinutes };

    }


    async getBarmansWorkTime( id ) {
        let barman = await this.getBarmanById( id );
        let barmanOrders = await Order.getOrdersByBarmanId( barman._id );

        let timeMinutes = 0;

        if( !barmanOrders.length )
            return { id: id, name: barman.name, time: timeMinutes };

        for (let index = 0; index < barmanOrders.length; index += 2) {
            if( !barmanOrders[index] && !barmanOrders[index + 1] )
                break;

            if( barmanOrders[index].state == "Finish" )
                break;

            let fill = barmanOrders[index].create_date;
            let refill = barmanOrders[index + 1].create_date;
            let diference = Math.abs(fill - refill);
            timeMinutes += Math.floor((diference/1000)/60);
        }

        return { id: id, name: barman.name, time: timeMinutes };
    }

    async getBarmanById( id ) {
        return await BarmanModel.findOne({ _id: id });
    }

    async getBarmanByName( name ) {
        return await BarmanModel.findOne({ name: name });
    }

    async addBarman( name ) {
        let barman = new BarmanModel({
            _id: new mongoose.Types.ObjectId(),
            name: name,
        });

        barman.save();
        return barman;
    }

    async deleteBarman ( id ) {
        let barman = await BarmanModel.deleteOne({ _id: id });
        return barman;
    }
}

module.exports = Barman;