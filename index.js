const { time } = require('console');
const {Collection, Client, MessageEmbed} = require('discord.js')
const fs = require('fs')
const client = new Client({
    disableEveryone: true,
    partials : ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION", "USER"]
});
const mongoose = require('mongoose');
const Discord = require('discord.js')

mongoose.connect('mongodb+srv://nonebot:PoPiTDieR2@nonebase.bswoj.mongodb.net/Data', {
    useUnifiedTopology : true,
    useNewUrlParser : true,
}).then(console.log('Mongodb Conectado'))



const config = require('./config.json')
const prefix = config.prefix
const token = config.token
module.exports = client;
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 
/**
 * @param {Client} client
 */
client.login(token)