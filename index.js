const Discord = require('discord.js');
const dotenv = require('dotenv').config();
const config = require('./config.json');
const fs = require('fs');
const csv = require('csv-parser');
const client = new Discord.Client();
const counting_game = require('./commands/counting.js')
client.commands = new Discord.Collection();

client.env={
    "PREFIX":"%",
    "TESTE_CATEGORY_ID":'815064384010453014',
    "CONVIVIO_VOICE_CHANNEL_ID":"521629727136546817",
    "tempchannel":[],
    "connectedusers":[],
    "count_room_id":0,
    "count":0,
    "last_clients_array":[]
}

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name.toLowerCase(), command);
}

client.database = {}
const databaseFiles = fs.readdirSync('./database/').filter(file => file.endsWith(".csv"));
for (const file of databaseFiles) {
    fs.createReadStream("./database/"+file).pipe(csv())
    .on('data', (row) => {
        if(typeof client.database[file.split(".")[0]] == "undefined"){
            client.database[file.split(".")[0]]=[];
        }
        client.database[file.split(".")[0]].push(row);
    });
}

client.once('ready', () => {
  console.log('Bot Connectado');
});


client.on('ready', () =>{
    
    client.on('message', (msg) => {
        if (msg.author.bot) return;
        console.log(Number.isInteger(+msg.content))
        if(msg.content.startsWith(client.env["PREFIX"])){
            const args = msg.content.slice(client.env["PREFIX"].length).split(/ +/);
            const commandName = args.shift().toLowerCase();
            const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            var result = "";
            if (command != undefined) {
                try {
                     result = command.execute(msg, msg.channel, msg.member, args, client, result);
                } catch (error) {
                    console.log("Command "+commandName+" failed to execute due to:" + error);
                }
            } else {
                 result = 'Command not found'
            }
          
            if(result !=""){
                
                msg.channel.send(result);
            }
            
        } else if (Number.isInteger(+msg.content) && client.env.count_room_id == msg.channel.id) {
            console.log("Entrei no counting")
            console.log(msg.content)
            counting_game.countingGame(msg.channel, msg, msg.member, client)
        }
    });
});


client.login(process.env.BOT_LOGIN);
