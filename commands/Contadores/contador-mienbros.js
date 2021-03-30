const { Client, Message, MessageEmbed, Channel } = require('discord.js');
const Schema = require('../../models/member-count')

module.exports = {
    name: 'ct',
    aliases : ['contador-miembros'],
    description: "Añadir contador de miembros.",
    usage: ``,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("No tienes permiso para usar este comando")

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) data.delete();

            const channel = await message.guild.channels.create(
                `Miembros: ${message.guild.memberCount}`,
                {
                    type: 'voice',
                    permissionOverwrites: [
                        {
                            id: message.guild.id,
                            deny: ['CONNECT']
                        }
                    ]
                }
            );

            new Schema({
                Guild: message.guild.id,
                Channel: channel.id,
                Member: message.guild.memberCount,
            }).save();
        })
    },
}