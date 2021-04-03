const { Client, Message, MessageEmbed, Channel, Util } = require('discord.js');
const Schema = require('../../models/reaction-role')

module.exports = {
    name: 'add',
    aliases : ['reaction-add'],
    description: "Añadir reaccion.",
    usage: `(role)(emoji)`,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const role = message.mentions.roles.first();

        //

        let [, emoji] = args;
        if(emoji) return message.reply('Especifica el emoji')

        const parsedEmoji = Util.parseEmoji(emoji);

        Schema.findOne({ Guild: message.guild.id}, async(err, data) => {
            if(data) {
                data.Roles[parsedEmoji.name] = [
                    role.id,
                    {
                        id: parsedEmoji.id,
                        raw: emoji
                    }
                ]

                await Schema.findOneAndUpdate(
                    { Guild: message.guild.id},
                    data
                    );
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Message: 0,
                    Roles: {
                        [parsedEmoji.name]: [
                            role.id,
                            {
                                id: parsedEmoji.id,
                                raw: emoji
                            },
                        ],
                    },
                }).save()
            }
            message.channel.send('Rol agregador')
        });
    },
};