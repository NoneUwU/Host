const { Client } = require("discord.js");
const Discord = require('discord.js')

module.exports  = {
    name: "ban",
    aliases : ['b'],
    description: "banear a un usuario.",
    usage: `(user) [rason]`,
    run : async(client, message, args) => {if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No tienes permiso para usar este comando")

    const mentionMember = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Sin razon dada";

    const banEmbed = new Discord.MessageEmbed()
        .setTitle(`Te han baneado de ^^${message.guild.name}^^`)
        .setDescription(`Razon: ${reason}
Quien te baneo: ${message.author}`)
        .setColor('#000000')
        .setTimestamp()
        .setFooter(client.user.tag, client.user.displayAvatarURL())

    if (!args[0]) return message.channel.send("Especifica el usuarion a banear");

    if (!mentionMember) return message.channel.send("El usuario indicado no es valido");

    if (!mentionMember.bannable) return message.channel.send("Este usuario no se puede banear");

    await mentionMember.send(banEmbed);
    await mentionMember.ban({
        reason: reason
    }).then(() => message.channel.send(`El usuario: ${mentionMember} ha sido baneado correctamente`));

    console.log(`Comando Ban Ejecutado: ${mentionMember}`)
    }
}