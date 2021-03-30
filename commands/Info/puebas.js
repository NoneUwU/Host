const { Client, Message, MessageEmbed, Channel } = require('discord.js');
const discord = require("discord.js");
const match = require('match')

module.exports = {
    name: 'prrr',
    aliases : [''],
    description: '',
    usage: `prefix`,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
      member = await message.mentions.members.last
      if(!member) {
          return message.channel.send(`\\❌ User not found.`);
      };
      const sp = member.permissions.serialize();
      const cp = message.channel.permissionsFor(member).serialize();
      return message.channel.send(new MessageEmbed().setColor(member.displayColor || 'GREY').setTitle(`${member.displayName}'s Permissions`).setFooter(`Permissions | \©️${new Date().getFullYear()} Mai`).setDescription(['\\♨️ - This Server', '\\#️⃣ - The Current Channel', '\`\`\`properties', ':hotsprings: | :hash: | Permission', '========================================', `${Object.keys(sp).map(perm => [
            sp[perm] ? ':heavy_check_mark: |' : ':x: |',
            cp[perm] ? ':heavy_check_mark: |' : ':x: |',
            perm.split('_').map(x => x[0] + x.slice(1).toLowerCase()).join(' ')
          ].join(' ')).join('\n')}`, '\`\`\`'].join('\n')));}
}