const client = require('../index')
const config = require('../config.json')
const prefix = config.prefix

client.on('messageReactionAdd', async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
    if(reaction.message.id === '825070163891322890'){
        if(reaction.emoji.name === ':thumbsup:') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('822555843777134592')
            user.send('You have obtained a role!')
        }
    }
})