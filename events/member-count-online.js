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
                const onlineMember = members.filter(member => member.presence.status === 'online').size;

                if (value.MemberOnline != onlineMember) {
                    console.log('The member online count Differs');
                    const channel1 = guild.channels.cache.get(value.ChannelOn);
                    channel1.setName(`Miembros Online: ${onlineMember}`);

                    value.MemberOnline = onlineMember;
                    value.save();
                }
                
            });
        });
    }, ms('5 second'));
})