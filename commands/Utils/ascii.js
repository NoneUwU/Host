const { Client, Message, MessageEmbed, Channel } = require('discord.js');
const Discord = require('discord.js')
const figlet = require('figlet');

module.exports = {
    name: 'ascii',
    aliases : ['aci'],
    description: 'Texto to ascii',
    usage: `(texto)`,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        figlet(args.join(" "), function(err, data) {
            if(err) {
                message.channel.send('Greška')
            }
            message.channel.send(data)
        })
    }
}
