const Schema = require('../../models/warns');
const db = require('../../models/warns');

module.exports = {
    name : 'remove-warn',
    aliases : ['rw'],
    description: "Quitar warn a un usario.",
    usage: `(user) (numero del warn)`,
    run : async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('No tienes permisos para user este comando.')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('Usuario invalido.')
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                let number = parseInt(args[1]) - 1
                data.content.splice(number, 1)
                message.channel.send('Warn eliminado.')
                data.save()
                await Schema.updateOne({
                    $inc: {
                      NumberWarns: -1
                    },
                  });
            } else {
                message.channel.send('Este usuario no tiene warns es este servidor!')
            }
        })
        let nunber = parseInt(args[1]) - 1

        console.log(`Remove warn: (By: ${message.author.tag} ${message.author.id}) (To: ${user.user.tag} ${user.id}) (Warn: ${nunber})`)
    }
}