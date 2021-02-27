const Discord = require('discord.js');
const command = require('./command');
const dotenv = require('dotenv').config();
const config = require('./config.json');

const client = new Discord.Client();

const prefix = "?";

//const hiddenChannel = Bot.voiceChannel.get('521629727136546817');
client.once('ready', () => {
    console.log('1');
});
const categoryID = '815064384010453014'
client.on('ready', () =>{

    client.on('message', (msg) => {
        if (msg.content === '?mm')  msg.guild.channels.create("name", {
            type: 'voice', 
        })
        .then((channel) => {
            channel.setParent(categoryID);
        })
      });

    /*
    command(client, 'createvoicechannel', (message) =>{
        
        const name = message.content.replace('?mm ' , '')
        
        message.guild.channels.create(name, {
            type: 'voice', 
        })
    
        .then((channel) => {})
    })*/

})



client.login(process.env.BOT_LOGIN);