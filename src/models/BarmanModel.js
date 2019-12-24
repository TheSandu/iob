const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/iob', { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

const BarmanSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    register_date: { type: Date, default: Date.now },
});

let BarmanModel = mongoose.model( 'barmans', BarmanSchema );

class Barman {
    async getBarmans( ) {
        return await BarmanModel.find();
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