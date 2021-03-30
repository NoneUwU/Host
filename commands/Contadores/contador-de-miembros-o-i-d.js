const { Client, Message, MessageEmbed, Channel } = require('discord.js');
const Schema = require('../../models/member-count-online')

module.exports = {
    name: 'ct-status',
    aliases : ['contador-status'],
    description: "Añadir contador de estatus.",
    usage: ``,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('No tienes permisos para usar este comando.')

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) data.delete();
            const members = message.guild.members.cache;

            const channel1 = await message.guild.channels.create(
                `Miembros Online: ${members.filter(member => member.presence.status === 'online').size}`,
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
            const channel2 = await message.guild.channels.create(
                `Miembros Ausentes: ${members.filter(member => member.presence.status === 'idle').size}`,
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
            const channel3 = await message.guild.channels.create(
                `Miembros No Molestar: ${members.filter(member => member.presence.status === 'dnd').size}`,
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
            const channel4 = await message.guild.channels.create(
                `Miembros Offline: ${members.filter(member => member.presence.status === 'offline').size}`,
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
                ChannelOn: channel1.id,
                ChannelAu: channel2.id,
                ChannelNo: channel3.id,
                ChannelOf: channel4.id,
                MemberOnline: `${members.filter(member => member.presence.status === 'online').size}`,
                MemberAusente: `${members.filter(member => member.presence.status === 'idle').size}`,
                MemberNoMolestar: `${members.filter(member => member.presence.status === 'dnd').size}`,
                MemberOffline: `${members.filter(member => member.presence.status === 'offline').size}`,
            }).save();
        })
    },
}