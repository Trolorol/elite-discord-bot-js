module.exports = {
    name: 'd',
    aliases: [],
    args: '',
    description: 'Deletes a temp channel created by the bot',
    argsDescription: {},
    execute(msg, args,client,result) {
        return deleteChannel(msg); 
    }
}


function deleteChannel(msg)
{
    client.env["tempchannel"].pop().delete();
}
