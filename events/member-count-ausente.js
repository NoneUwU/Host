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
                const ausenteMember = members.filter(member => member.presence.status === 'idle').size;

                if (value.MemberAusente != ausenteMember) {
                    console.log('The member online count Differs');
                    const channel2 = guild.channels.cache.get(value.ChannelAu);
                    channel2.setName(`Miembros Ausentes: ${ausenteMember}`);

                    value.MemberAusente = ausenteMember;
                    value.save();
                }
                
            });
        });
    }, ms('5 second'));
})