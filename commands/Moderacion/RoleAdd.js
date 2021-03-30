const { Client } = require("discord.js");
const Discord = require('discord.js')

module.exports  = {
    name: "addrole",
    aliases : ['ar'],
    description: "Agregar un role a un usuario.",
    usage: `(usuario) (Nombre del rol)`,
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('No tienes permisos para usar este comando.')
        
        const member = message.mentions.members.first()
        if(!member) return message.reply('Mensiona el usuario a dar el role')

        let roleadd = args.slice(1).join(" ");
        if (!roleadd) return message.channel.send('selecciona un role')


        member.roles.add(roleadd)
    }
}