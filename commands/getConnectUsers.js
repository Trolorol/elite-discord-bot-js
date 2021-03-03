module.exports = {
    name: 'c',
    aliases: [],
    args: '',
    description: 'Gets the connected Users in the convivio channel',
    argsDescription: {},
    execute(msg, channel, member, args, client, result) {
        return this.getConnectedUsers(msg, client);
    },
    getConnectedUsers(msg, client)
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
}

