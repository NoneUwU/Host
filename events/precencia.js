const client = require('../index')
const config = require('../config.json')
const prefix = config.prefix

client.on('ready', () => {
    client.user.setPresence({
        status: 'online',
        activity: {
            name: `${prefix}help`,
            type: 'STREAMING',
            url: 'https://www.twitch.tv/elnoneuwu'
        }
    })
    console.log(`${client.user.username} ✅`)
})