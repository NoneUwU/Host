  
const db = require('../../models/warns')

module.exports = {
    name : 'remove-all-warns',
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('No tienes permisos para usar este comando.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('Usuario invalido.')
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                await db.findOneAndDelete({ user : user.user.id, guildid: message.guild.id})
                message.channel.send(`Warns eliminados de: @${user.user.tag}`)
            } else {
                message.channel.send('Este usuario no tiene warns en este servidor!')
            }
        })
    }
}