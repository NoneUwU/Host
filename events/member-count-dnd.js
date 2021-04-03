const client = require('../index');
const config = require('../config.json')
const prefix = config.prefix
const ms = require('ms');
const Schema = require('../models/member-count-online');

client.on('ready',() => {
    setInterval(() => {
        Schema.find().then((data) => {
            if(!data && !data.length) return;

            data.forEach((value) => {
                const guild = client.guilds.cache.get(value.Guild);
                const members = guild.members.cache;
                const dndMember = members.filter(member => member.presence.status === 'dnd').size;

                if (value.MemberNoMolestar != dndMember) {
                    console.log('The member online count Differs');
                    const channel3 = guild.channels.cache.get(value.ChannelNo);
                    channel3.setName(`Miembros No Molestar: ${dndMember}`);

                    value.MemberNoMolestar = dndMember;
                    value.save();
                }
                
            });
        });
    }, ms('15 minutes'));
})
