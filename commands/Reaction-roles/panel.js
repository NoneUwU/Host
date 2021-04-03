const { Client, Message, MessageEmbed, Channel, Util, MessageAttachment } = require('discord.js');
const Schema = require('../../models/reaction-role')

module.exports = {
    name: 'panel',
    aliases : ['panel-reaccion'],
    description: "Abrir panel de reaccion.",
    usage: ``,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        
        const channel = message.mentions.channels.first() || message.channel;

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(!data) return message.reply('Sin datos aqui')
            const mapped = Object.keys(data.Roles)
                .map((value, index) =>{
                    const role = message.guild.roles.cache.get(
                        data.Roles[value][0]
                    );
                    return `${index + 1}) ${
                        data.Roles[value][1],raw
                    } - ${role}`;
                })
                .join('\n\n');

            channel
                .send(new MessageEmbed().setDescription(mapped))
                .then((msg) =>{
                    data.Message = msg.id;
                    data.save();

                    const reaction = Object.values(data.Roles).map(
                        (val) => val[1].id
                    );
                    reaction.map((emoji) => msg.react(emoji))
                })
        })
    },
};