const { Client } = require("discord.js");
const Discord = require('discord.js')

module.exports  = {
    name: "kick",
    aliases : ['k'],
    description: "Expulsar a un usuario.",
    run : async(client, message, args) => {
        
        const prim = args.slice(0).join(" ");
        
        message.reply.send(`${prim}`)
    }
}