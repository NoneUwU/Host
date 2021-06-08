const { Client } = require("discord.js");
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const utils = require('utils')

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'Sin rol',
	ALL_MEMBERS: 'Everyone'
};

const verificationLevels = {
	NONE: 'Ninguna',
	LOW: 'Baja',
	MEDIUM: 'Media',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

const regions = {
	brazil: 'Brazil',
	europe: 'Europa',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japon',
	russia: 'Rusia',
	singapore: 'Singapur',
	southafrica: 'Sur Africa',
	sydeny: 'Sydeny',
	'us-central': 'US Central',
	'us-east': 'US Este',
	'us-west': 'US Norte',
	'us-south': 'US Sur'
};

module.exports  = {
    name: "server-info",
    aliases : ['si'],
    description: "Informacion de un servidor.",
    usage: ``,
    run : async(client, message, args) => {
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;

		const embed = new MessageEmbed()
			.setDescription(`**Informacion de  __${message.guild.name}__**`)
			.setColor('BLUE')
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.addField('General', [
				`**❯ Nombre:** ${message.guild.name}`,
				`**❯ ID:** ${message.guild.id}`,
				`**❯ Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
				`**❯ Region:** ${regions[message.guild.region]}`,
				`**❯ Nivel de Bost:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
				`**❯ Filtro de Expicidad:** ${filterLevels[message.guild.explicitContentFilter]}`,
				`**❯ Nivel de Verificacion:** ${verificationLevels[message.guild.verificationLevel]}`,
				`**❯ creado:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
				'\u200b'
			])
			.addField('Stadisticas', [
				`**❯ Roles:** ${roles.length}`,
				`**❯ Emojis:** ${emojis.size}`,
				`**❯ Emojis Normales:** ${emojis.filter(emoji => !emoji.animated).size}`,
				`**❯ Emojis Animados:** ${emojis.filter(emoji => emoji.animated).size}`,
				`**❯ Miembros:** ${message.guild.memberCount}`,
				`**❯ Humanos:** ${members.filter(member => !member.user.bot).size}`,
				`**❯ Bots:** ${members.filter(member => member.user.bot).size}`,
				`**❯ Canales de Texto:** ${channels.filter(channel => channel.type === 'text').size}`,
				`**❯ Canales de Voz:** ${channels.filter(channel => channel.type === 'voice').size}`,
				`**❯ Bosters:** ${message.guild.premiumSubscriptionCount || '0'}`,
				'\u200b'
			])
			.addField('Precencias', [
				`**❯ Online:** ${members.filter(member => member.presence.status === 'online').size}`,
				`**❯ Ausente:** ${members.filter(member => member.presence.status === 'idle').size}`,
				`**❯ No Molestar:** ${members.filter(member => member.presence.status === 'dnd').size}`,
				`**❯ Offline:** ${members.filter(member => member.presence.status === 'offline').size}`,
				'\u200b'
			])
			.setTimestamp();
		message.channel.send(embed);
    }
}
