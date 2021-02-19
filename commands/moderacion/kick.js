const { Client } = require("discord.js");
const Discord = require('discord.js')

module.exports  = {
    name: "kick",
    aliases : ['k'],
    description: "Expulsar a un usuario.",
    run : async(client, message, args) => {
        if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("No tienes permiso para usar este comando")

        const mentionMember = message.mentions.members.first();
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Sin razon dada";

        const kickEmbed = new Discord.MessageEmbed()
            .setTitle(`Te han expulsado de ^^${message.guild.name}^^`)
            .setDescription(`Razon: ${reason}
Quien te expulso: ${message.author}`)
            .setColor('#000000')
            .setTimestamp()
            .setFooter(client.user.tag, client.user.displayAvatarURL())

        if (!args[0]) return message.channel.send("Especifica el usuarion a expulsar");

        if (!mentionMember) return message.channel.send("El usuario indicado no es valido");

        if (!mentionMember.kickable) return message.channel.send("Este usuario no se puede expulsar");


        try {
            await mentionMember.send(kickEmbed);
        } catch (err) {

        }

        try {
            await mentionMember.kick(reason);
        } catch (err) {
            return message.channel.send("No se puede Expulsar al usuario. PERDON...")
        }
    }
}