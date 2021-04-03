const client = require('../index')
const config = require('../config.json')
const prefix = config.prefix
const ms = require('ms');
const Schema = require('../models/member-count');

client.on('ready',() => {
    setInterval(() => {
        Schema.find().then((data) => {
            if(!data && !data.length) return;

            data.forEach((value) => {
                const guild = client.guilds.cache.get(value.Guild);
                const memberCount = guild.memberCount;

                if(value.Member != memberCount) {
                    console.log('The member count Differs');
                    const channel = guild.channels.cache.get(value.Channel);
                    channel.setName(`Members: ${memberCount}`);
                    console.log('ppppps')

                    value.Member = memberCount;
                    value.save();
                }
            });
        });
    }, ms('15 minutes'));
});
