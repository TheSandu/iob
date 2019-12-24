const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/iob', { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

const TimeTableSchema = new Schema({
    _id: Schema.Types.ObjectId,
    date: Date,
    table: Number,
    place: Number,
    barman_id: Schema.Types.ObjectId,
});

let TimeTableModel = mongoose.model( 'timeTabele', TimeTableSchema );

class TimeTable {
    async getTimeTable( ) {
        return await TimeTableModel.find();
    }

    async getTimeTableItem( date, table, place ) {
        return await TimeTableModel.findOne({ table: table, place: place, date: date });
    }

    async getTimeTableItemById( id ) {
        return await TimeTableModel.findOne({ _id: id });
    }

    async getTimeTableItemsByDate( date ) {
        return await TimeTableModel.find({ date: date });
    }

    async getTimeTableItemsByPlace( table, place ) {
        return await TimeTableModel.find({ table: table, place: place });
    }

    async addTimeTableItem( date, table, place, barmanId ) {
        let barman = new TimeTableModel({
            _id: new mongoose.Types.ObjectId(),
            date: date,
            table: table,
            place: place,
            barman_id: barmanId,
        });

        barman.save();
        return barman;
    }

    async deleteTimeTableItem ( id ) {
        let barman = await TimeTableModel.deleteOne({ _id: id });
        return barman;
    }
}

module.exports = TimeTable;