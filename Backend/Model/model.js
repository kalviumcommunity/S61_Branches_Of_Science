const mongoose = require('mongoose')

const branchSchema = new mongoose.Schema({
    "ID": Number,
    "Title": String,
    "Toughness": Number,
    "Needed basics": Array,
    "Popularity": Number,
    "Time takes": String,
    "Overall grade": Number,
    "Description": String,
    "created_by": String,
})

const Branch = mongoose.model('branches', branchSchema)

module.exports = Branch