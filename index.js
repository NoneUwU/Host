const { time } = require('console');
const {Collection, Client, Discord} = require('discord.js')
const fs = require('fs')
const client = new Client({
    disableEveryone: true,
    partials : ["MESSAGE", "CHANNEL", "REACTION"]
});
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nonebot:PoPiTDieR2@nonebase.bswoj.mongodb.net/Data', {
    useUnifiedTopology : true,
    useNewUrlParser : true,
}).then(console.log('Mongodb Conectado'))



const config = require('./config.json')
const prefix = config.prefix
const token = config.token
module.exports = client;
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 
/**
 * @param {Client} client
 */
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
client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
})
client.on('messageReactionAdd', async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
    if(reaction.message.id === '<messageid>'){
        if(reaction.emoji.name === '<emoji>') {
            await reaction.message.guild.members.cache.get(user.id).roles.add('<roleID>')
            user.send('You have obtained a role!')
        }
    }
})
client.on('messageReactionRemove', async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
    if(reaction.message.id === '<messageid>'){
        if(reaction.emoji.name === '<emoji>') {
            await reaction.message.guild.members.cache.get(user.id).roles.remove('<roleID>')
            user.send('One of your roles has been removed!')
        }
    }
})

const usersMap = new Map();
const LIMIT = 6;
const TIME = 600000;
const DIFF = 3000;

client.on('message', async(message) => {
    if(message.author.bot) return;
    if(usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;
        console.log(difference);

        if(difference > DIFF) {
            clearTimeout(timer);
            console.log('TimeOut Limpiado');
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
                console.log('Eliminado del mapa.')
            }, TIME);
            usersMap.set(message.author.id, userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
                let muterole = message.guild.roles.cache.find(role => role.name === 'mute');
                if(!muterole) {
                    try{
                        muterole = await message.guild.roles.create({
                            data: {
                              name: 'mute',
                              color: '#ff0000',
                              permissions: []
                            },
                            reason: 'Role de muteado',
                          });
                        message.guild.channels.cache.forEach(async (channel, id) => {
                            await channel.createOverwrite(muterole, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS : false
                            })
                        });
                    }catch (e) {
                        console.log(e)
                    }
                }
                message.guild.channels.cache.forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS : false
                    })
                });
                message.member.roles.add(muterole);
                message.channel.send('Muteado por: `10 Minutos`');
                setTimeout(() => {
                    message.member.roles.remove(muterole);
                    message.channel.send('Desmuteado!')
                }, TIME);
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.author.id, userData);
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            usersMap.delete(message.author.id);
            console.log('Eliminado del mapa.')
        }, TIME);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage : message,
            timer : fn
        });
    }
})
client.login(token)
