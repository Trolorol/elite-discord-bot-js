const Discord = require('discord.js');
const command = require('./command');
const dotenv = require('dotenv').config();
const config = require('./config.json');
const fs = require("fs");

const client = new Discord.Client();
client.commands = new Discord.Collection();

var tempchannel = [];
var connectedusers = [];


client.env={
    "PREFIX":"?",
    "TESTE_CATEGORY_ID":'815064384010453014',
    "CONVIVIO_VOICE_CHANNEL_ID":"521629727136546817"
}

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name.toLowerCase(), command);
}


client.once('ready', () => {
    console.log('1');
});

client.on('ready', () =>{
    
    client.on('message', (msg) => {
        if(message.content.startsWith(client.env["PREFIX"])){
            const args = message.content.slice(client.env["PREFIX"].length).split(/ +/);
            const commandName = args.shift().toLowerCase();
            const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            
            if (command != undefined) {
                try {
                    result = command.execute(message, args, client, result);
                } catch (error) {
                    console.log("Command "+commandName+" failed to execute due to:" + error);
                }
            } else {
                //games / other commands
            }
            
            if (commandName === 'mm')
            {
                createChannel(msg,client);
               
            } 
            if (commandName === 'd') 
            {
                deleteChannel(msg);
            }

            if (commandName === 'c')
            {
                getConnectedUsers(msg, client);
            }

            if(result !=""){
                message.channel.send(result);
            }
        }
        
    });
})

/*
module.exports = {
    name: 'mm',
    aliases: [],
    execute(message, args,client,result) {
        return createChannel(msg,client);
    }
}
*/
/*
module.exports = {
    name: 'mm',
    aliases: [],
    execute(message, args,client,result) {
        return createChannel(msg,client);
    }
}
*/
function createChannel(msg, client)
{
    msg.guild.channels.create("canal de teste", {
        type: 'voice', 
    })
    
    .then((channel) => {
        channel.setParent(client.env["TESTE_CATEGORY_ID"]);
        tempchannel.push(channel);
        const users = getConnectedUsers(msg, client);

        for (const [memberId, member] of msg.guild.members.cache.filter(r => users.includes(r.id))) {
            console.log(member);
            member.voice.setChannel(channel);
        }
        return "";
    })
    

}

function deleteChannel(msg)
{
    tempchannel.pop().delete();
}

function getConnectedUsers(msg, client)
{
    const channelID = client.env["CONVIVIO_VOICE_CHANNEL_ID"];
    var keys;
    const channels = client.channels.cache.filter(r => r.id == channelID);
    
    for (const [channelID, channel] of channels) {
        keys = Array.from(channel.members.keys());

    }
    console.log(keys[1]);    
    return [keys[1]];

    /*msg.channel.send(JSON.stringify(keys));
    msg.channel.send(JSON.stringify(conUsers));
    console.log(conUsers);
    console.log("//////////////////////////////////////////////////////////////////")
    console.log(client.users.cache.find(r => r.id == keys[1]));*/
    //var user1 = Math.random() * conUsers.length();
    //remover user1 do array
    //var user2 = Math.random() * conUsers.length();

    //msg.channel.send("Os utilizadores conectados são: " + JSON.stringify(conUsers.get(keys[0])) + " & " + JSON.stringify(conUsers.get(keys[1])));

    //Math.random() * conUsers.length();
}

client.login(process.env.BOT_LOGIN);