const db = require('../../models/warns')
const { Message, MessageEmbed } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    name :'warn',
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('No tienes permisos para usar este comando.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('Usuario invalido.')
        const reason = args.slice(1).join(" ")
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    guildid: message.guild.id,
                    user : user.user.id,
                    content : [
                        {
                            moderator : message.author.id,
                            reason : reason
                        }
                    ]
                })
            } else {
                const obj = {
                    moderator: message.author.id,
                    reason : reason
                }
                data.content.push(obj)
            }
            data.save()
        });
        
        const priven = new Discord.MessageEmbed()
        .setDescription(`Has sido warned por: **${reason}**`)
        .setColor("RED")

        try {
            await user.send(priven);
        } catch (err) {

        }
        
        message.channel.send(new MessageEmbed()
            .setDescription(`Warned **${user}** Por **${reason}**`)
            .setColor('BLUE')
        )
    }
}
