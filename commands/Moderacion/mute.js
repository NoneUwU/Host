const { Client, MessageEmbed } = require("discord.js");
const Discord = require('discord.js');
const ms = require('ms');

module.exports  = {
    name: "mute",
    aliases : ['m'],
    description: "Mutear a un usuario.",
    usage: `(user) (time)`,
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('No tienes permisos para usar este comando.')
        
        const member = message.mentions.members.first()
        const time = args[1]
        let muteroles = message.guild.roles.cache.find(role => role.name === 'Mute');
        
        if(!member) return message.channel.send('Mention A User to Temp Mute.')
        if(!time) return message.channel.send('Specify A Time To Mute')
        if(!muteroles) {
            try{
                muteroles = await message.guild.roles.create({
                    data: {
                      name: 'Mute',
                      color: '#ff0000',
                      permissions: []
                    },
                    reason: 'Rol para las personas muteadas (Sin ver canales)',
                  });
            }catch (e) {
                console.log(e)
            }
        }
        
        member.roles.add(muteroles)

        if(member.roles.cache.has(muteroles)) return message.reply('User Is Already Muted.')
        await member.roles.add(muteroles)

        const embed = new MessageEmbed()
        .setTitle('Usuario muteado Temporalmente')
        .setDescription(`<@${member.user.id}> Esta muteado por ${time}.`)
        .addField('Moderador: ', message.author)
        .setColor('RANDOM')
        message.channel.send(embed)

        
        setTimeout(async () => {
            await member.roles.remove(muteroles)
            message.channel.send(`<@${member.user.id}> A sido desmuteado despues de: ${time} Muteado.`)
        }, ms(time))
    }
}