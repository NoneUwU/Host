const db = require('../../models/warns');
const { Message, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const { find } = require('../../models/warns');
const Schema = require('../../models/warns');
const ms = require('ms');

module.exports = {
    name :'warn',
    aliases : ['w'],
    description: "Agregar warn a un usuario.",
    usage: `(user) [rason]`,
    /**
     * @param {Message} message
     */
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('..')
        
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.channel.send('..')
        
        const reason = args.slice(1).join(" ") || "Sin razon"
        
        db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
            if(err) throw err;
            if(!data) {
                data = new db({
                    guildid : message.guild.id,
                    user : user.user.id,
                    content : [
                        {
                            moderator : message.author.id,
                            reason : reason
                        },
                    ],
                    NumberWarns : `1`
                })
            } else {
                const obj = {
                    moderator : message.author.id,
                    reason : reason,
                }
                data.content.push(obj)

                await Schema.updateOne({
                    $inc: {
                      NumberWarns: 1
                    },
                  });
            }
            data.save()
            if(Schema.NumberWarns = '2') {
                message.channel.send('ll')
            }
        });
        Schema.find().then((data) => {
            if(!data && !data.length) return;

            data.forEach((value) => {

                //p
            });
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
        
        console.log(`Warn: (By ${message.author.tag} ${message.author.id}) (To: ${user.user.tag} ${user.id}) (Reason: ${reason})`)
    }
}