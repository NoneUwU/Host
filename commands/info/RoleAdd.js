const { Client } = require("discord.js");
const Discord = require('discord.js')

module.exports  = {
    name: "addrole",
    aliases : ['ar'],
    run : async(client, message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('Mensiona el usuario a dar el role')

        let roleadd = args.slice(1).join(" ");
        if (!roleadd) return message.channel.send('selecciona un role')


        member.roles.add(roleadd)
    }
}