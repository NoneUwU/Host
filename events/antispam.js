const client = require('../index')
const config = require('../config.json')
const prefix = config.prefix

const usersMap = new Map();
const LIMIT = 5;
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
            console.log('Cleared Timeout');
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.author.id);
                console.log('Removed from map.')
            }, TIME);
            usersMap.set(message.author.id, userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
                let muterole = message.guild.roles.cache.find(role => role.name === 'Mute-');
                if(!muterole) {
                    try{
                        muterole = await message.guild.roles.create({
                            data: {
                              name: 'Mute-',
                              color: '#ff0000',
                              position: 1,
                              permissions: []
                            },
                            reason: 'Role de muteado',
                          });
                        message.guild.channels.cache.forEach(async (channel, id) => {
                            await channel.createOverwrite(muterole, {
                                SEND_MESSAGES: false,
                                ADD_REACTIONS : false
                            })
                        })
                    }catch (e) {
                        console.log(e)
                    }
                }
				message.guild.channels.cache.forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS : false
                    })
                })
                message.member.roles.add(muterole);
                console.log(`Spam Mute-: (To: ${message.author.tag} ${message.author.id})`)
                message.channel.send('Muteado por `10 minutos`');
                setTimeout(() => {
                    message.member.roles.remove(muterole);
                    message.channel.send('Desmuteado')
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
            console.log('Removed from map.')
        }, TIME);
        usersMap.set(message.author.id, {
            msgCount: 1,
            lastMessage : message,
            timer : fn
        });
    }
})