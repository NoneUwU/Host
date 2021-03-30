const { Schema, model } = require('mongoose');

module.exports = model(
    "member-count-status", 
    new Schema({
        Guild: String,
        ChannelOn: String,
        ChannelAu: String,
        ChannelNo: String,
        ChannelOf: String,
        MemberOnline: String,
        MemberAusente: String,
        MemberNoMolestar: String,
        MemberOffline: String,

    })
);
