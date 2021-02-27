const Discord = require('discord.js');
const command = require('./command');
const dotenv = require('dotenv');

dotenv.config()

const client = new Discord.Client();

const prefix = "?";

//const hiddenChannel = Bot.voiceChannel.get('521629727136546817');

const categoryID = '815064384010453014'

command(client, 'createvoicechannel', (message) =>{
    const name = message.content.replace('?mm' , '')
    message.guild.channels.create(name, {
        type: 'voice', 
    })

    .then((channel) => {})
})


client.login(env.BOT_LOGIN);