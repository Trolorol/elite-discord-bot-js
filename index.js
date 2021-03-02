const Discord = require('discord.js');
const dotenv = require('dotenv').config();
const config = require('./config.json');
const fs = require("fs");

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.env={
    "PREFIX":"--",
    "TESTE_CATEGORY_ID":'815064384010453014',
    "CONVIVIO_VOICE_CHANNEL_ID":"521629727136546817",
    "tempchannel":[],
    "connectedusers":[]
}

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name.toLowerCase(), command);
}


client.once('ready', () => {
    console.log('Bot Connectado');
});

client.on('ready', () =>{
    
    client.on('message', (msg) => {
        if(msg.content.startsWith(client.env["PREFIX"])){
            const args = msg.content.slice(client.env["PREFIX"].length).split(/ +/);
            const commandName = args.shift().toLowerCase();
            const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            var result;
            if (command != undefined) {
                try {
                    result = command.execute(msg, args, client, result);
                } catch (error) {
                    console.log("Command "+commandName+" failed to execute due to:" + error);
                }
            } else {
                //games / other commands
            }
          
            if(result !=""){
                msg.channel.send(result);
            }
        }
        
    });
})


client.login(process.env.BOT_LOGIN);