const client = require('../index')

client.on('ready',() => {
    console.log(`${client.user.username} Ha iniciado Correctamante.`)
})