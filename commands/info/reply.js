const { Client } = require("discord.js");
const Discord = require('discord.js')

module.exports  = {
    name: "reply",
    aliases : ['r'],
    description: "Reply.",
    run : async(client, message, args) => {
        
        const prim = args.slice(0).join(" ");
        
        message.reply.send(`${prim}`)
    }
}