
const connectedUsers = require('./getConnectUsers.js');
module.exports = {
    name: 'mm',
    aliases: [],
    args: '',
    description: 'Creates a temp channel',
    argsDescription: {},
    execute(msg, args,client,result) {
        return createChannel(msg,client);
    }
}

function createChannel(msg, client)
{
    msg.guild.channels.create("canal de teste", {
        type: 'voice', 
    })
    
    .then((channel) => {
        channel.setParent(client.env["TESTE_CATEGORY_ID"]);
        client.env["tempchannel"].push(channel);
        const users = connectedUsers.getConnectedUsers(msg, client);

        for (const [memberId, member] of msg.guild.members.cache.filter(r => users.includes(r.id))) {
            console.log(member);
            member.voice.setChannel(channel);
        }
        return "";
    })
}
