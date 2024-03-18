const mongoose = require('mongoose')

const branchSchema = new mongoose.Schema({
    id: Number,
    title: String,
    toughness: Number,
    neededBasics: String,
    popularity: Number,
    timeTaken: String,
    overallGrade: Number,
    description: String,
})

const Branch = mongoose.model('branches', branchSchema)

module.exports = Branch