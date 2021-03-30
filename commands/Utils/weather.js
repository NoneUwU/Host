const weather = require('weather-js');
const { Client, Message, MessageEmbed, Channel } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'agua',
    aliases : ['agu'],
    description: '',
    usage: `(cuidad)`,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {

        weather.find({ search: args.join(" "), degreeType: 'F' }, function(error, result) {
            // 'C' can be changed to 'F' for farneheit results
            if (!args[0]) return message.reply(
                new MessageEmbed()
                    .setTitle('Uso mal')
                    .setDescription(`Uso: (place>)`)
            );

            if (result === undefined || result.length === 0) return message.reply(
                new MessageEmbed()
                    .setTitle('Error 404')
                    .setDescription(`No se pudo encontrar esa ciudad`)
            );

            var current = result[0].current;
            var location = result[0].location;

            const weatherinfo = new Discord.MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Previsión meteorológica para ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(client.color)
                .addField('Zona horaria', `UTC${location.timezone}`, true)
                .addField('Escala', 'Celsius', true)
                .addField('Temperatura', `${current.temperature}°`, true)
                .addField('Viento', current.winddisplay, true)
                .addField('Se siente como', `${current.feelslike}°`, true)
                .addField('Humedad', `${current.humidity}%`, true)

            message.channel.send(weatherinfo)
        })
    }
}