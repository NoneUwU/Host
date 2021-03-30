const client = require('../index')
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
                const ausenteMember = members.filter(member => member.presence.status === 'idle').size;
                const dndMember = members.filter(member => member.presence.status === 'dnd').size;
                const offlineMember = members.filter(member => member.presence.status === 'offline').size;

                if (value.MemberOnline != onlineMember) {
                    console.log('The member online count Differs');
                    const channel1 = guild.channels.cache.get(value.ChannelOn);
                    channel1.setName(`Miembros Online: ${onlineMember}`);

                    value.MemberOnline = onlineMember;
                    value.save();
                }
                if (value.MemberAusente != ausenteMember) {
                    console.log('The member online count Differs');
                    const channel2 = guild.channels.cache.get(value.ChannelAu);
                    channel2.setName(`Miembros Ausentes: ${ausenteMember}`);

                    value.MemberAusente = ausenteMember;
                    value.save();
                }
                if (value.MemberNoMolestar != dndMember) {
                    console.log('The member online count Differs');
                    const channel3 = guild.channels.cache.get(value.ChannelNo);
                    channel3.setName(`Miembros No Molestar: ${dndMember}`);

                    value.MemberNoMolestar = dndMember;
                    value.save();
                }
                if (value.MemberOffline != offlineMember) {
                    console.log('The member online count Differs');
                    const channel4 = guild.channels.cache.get(value.ChannelOf);
                    channel4.setName(`Miembros Offline: ${offlineMember}`);

                    value.MemberOffline = offlineMember;
                    value.save();
                }
                
            });
        });
    }, ms('15 minutes'));
});
