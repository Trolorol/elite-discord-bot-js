const Discord = require('discord.js');
const command = require('./command');
const dotenv = require('dotenv').config();
const config = require('./config.json');

const client = new Discord.Client();
var tempchannel = [];
var connectedusers = [];

const prefix = "?";

//const hiddenChannel = Bot.voiceChannel.get('521629727136546817');
client.once('ready', () => {
    console.log('1');
});
const categoryID = '815064384010453014'
client.on('ready', () =>{
    
    client.on('message', (msg) => {
        if (msg.content === '?mm')
        {
            createChannel(msg);
        } 
        if (msg.content === '?d') 
        {
            deleteChannel(msg);
        }

        if (msg.content === '?c')
        {
            getConnectedUsers(msg, client);
        }
    });
})


function createChannel(msg)
{
    msg.guild.channels.create("canal de teste", {
        type: 'voice', 
    })
    
    .then((channel) => {
        channel.setParent(categoryID);
        tempchannel.push(channel);
    })
}

function deleteChannel(msg)
{
    tempchannel.pop().delete();
}

function getConnectedUsers(msg, client)
{
    const channelID = '521629727136546817';

    console.log(client.channels.cache.get(channelID).members);
}

client.login(process.env.BOT_LOGIN);