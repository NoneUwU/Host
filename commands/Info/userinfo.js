const { Client, Message, MessageEmbed, Channel } = require('discord.js');
const discord = require("discord.js");

module.exports = {
    name: 'userinfo',
    aliases : ['ui'],
    description: 'Informacion de un usuario.',
    usage: `[user]`,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
      
  const recon = require("reconlx");
  // Destructure the package
  const daysAgo = recon.DaysAgo;

  if (
    message.mentions.users.last() /*|| message.mentions.users.last().id === client.user.id*/
  ) {
    const wuser = message.mentions.users.last();
    const mUser = message.mentions.members.last();
    const embed = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(wuser.username, wuser.displayAvatarURL({ dynamic: true }))
      .setTitle(`Informqcion para: ${wuser.username}`)
      .addFields(
        {
          name: "Nombre de usuario",
          value: mUser.user.tag,
          inline: true,
        },
        {
          name: "Es un bot",
          value: mUser.user.bot,
          inline: true,
        },
        {
          name: "ID",
          value: message.author.id,
          inline: true,
        },
        {
          name: "Apodo",
          value: mUser.nickname || "None",
          inline: true,
        },
        {
          name: "Cuando se unio",
          value: new Date(mUser.joinedTimestamp).toLocaleDateString(),
          inline: true,
        },
        {
          name: "Cuenta creada",
          value:
            new Date(wuser.createdTimestamp).toLocaleDateString() +
            ` (${daysAgo(wuser.createdAt)})`,
          inline: true,
        },
        {
          name: "Contador de roles",
          value: mUser.roles.cache.size - 1,
          inline: true,
        },
        {
          name: "Roles",
          value: mUser.roles.cache.map((role) => `<@&${role.id}>`),
          inline: true,
        },
        {
          name: "Status",
          value: "`" + wuser.presence.status.toUpperCase() + "`",
          inline: true,
        }
      );
    message.channel.send(embed);
  } else {
    //        if (message.mentions.users.last().id !== this.client.user.id || message.mentions.users.last().id === this.client.user.id) {
    const e = new MessageEmbed()
      .setColor(client.color)
      .setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTitle(`Informacion de: ${message.author.username}`)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .addFields(
        {
          name: "Nombre de Usuario",
          value: message.author.tag,
          inline: true,
        },
        {
          name: "ID",
          value: message.author.id,
          inline: true,
        },
        {
          name: "Es un bot",
          value: message.author.bot,
          inline: true,
        },
        {
          name: "Apodo",
          value: message.member.nickname || "None",
          inline: true,
        },
        {
          name: "Cuando se unio",
          value: new Date(message.member.joinedTimestamp).toLocaleDateString(),
          inline: true,
        },
        {
          name: "Cuenta creada",
          value:
            new Date(message.author.createdTimestamp).toLocaleDateString() +
            ` (${daysAgo(message.author.createdAt)})`,
          inline: true,
        },
        {
          name: "Contador de roles",
          value: message.member.roles.cache.size - 1,
          inline: true,
        },
        {
          name: "Roles",
          value: message.member.roles.cache.map((role) => `<@&${role.id}>`),
          inline: true,
        },
        {
          name: "Status",
          value: "`" + message.author.presence.status.toUpperCase() + "`",
          inline: true,
        }
      );
    message.channel.send(e);
  }
    }
}