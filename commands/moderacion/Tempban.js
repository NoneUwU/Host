const { Client } = require("discord.js");
const Discord = require('discord.js');
const ms = require('ms');

module.exports  = {
    name: "temp-ban",
    aliases : ['tb'],
    description: "Bannear temporalmente a un usuario",
    run : async(client, message, args) => {
        const member = message.mentions.members.first()
        const user = message.author.id
        const time = args [0]
        const rason = args [1]
        
        if (!member) return  message.reply('Mensiona el usuario a banear temporalmente.')
        if (!time) return message.reply('Especifica el tiempo.')
        if (!rason) return message.reply('Especifica la rason.')
        if (!member.bannable) return message.channel.send("Este usuario no se puede banear");


        await member.ban({
          reason: `Baneado temporalmente: Por: ${user.tag}.  RASON: ${rason}`
      }).then(() => message.channel.send(`El usuario: ${member} ha sido baneado correctamente por ${time}`));
        const embed = new Discord.MessageEmbed()
        .setTitle('El usuario a sido baneado.')
        .setDescription(`<@${member.user.id}> por ${time}.`)
        .addField('Baneado por:-', message.author)
        .setColor('RANDOM')
        message.channel.send(embed)

        // Unban A User After Time Is Finished
        setTimeout(async () => {
            await message.guild.members.unban(member)
            message.channel.send(`<@${member.user.id}> ha sido desbaneado despues de ${time} De baneo.`)
        }, ms(time))
    }
}