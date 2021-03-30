const mongoose = require('mongoose');

let Schema = mongoose.Schema({
    guildid: String,
    user: String,
    content: Array,
    NumberWarns: Number
})

module.exports = mongoose.model('warn', Schema)