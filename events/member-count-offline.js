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
                const offlineMember = members.filter(member => member.presence.status === 'offline').size;

                if (value.MemberOffline != offlineMember) {
                    console.log('The member online count Differs');
                    const channel4 = guild.channels.cache.get(value.ChannelOf);
                    channel4.setName(`Miembros Offline: ${offlineMember}`);

                    value.MemberOffline = offlineMember;
                    value.save();
                }
            
            });
        });
    }, ms('5 second'));
})