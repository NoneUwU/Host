const client = require('../index')
const config = require('../config.json')
const prefix = config.prefix
const ms = require('ms');
const Schema = require('../models/member-count');

client.on('ready',() => {
    console.log(`${client.user.username} Ha iniciado Correctamante.`);
});
