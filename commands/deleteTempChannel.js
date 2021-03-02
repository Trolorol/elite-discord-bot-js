module.exports = {
    name: 'd',
    aliases: [],
    execute(msg, args,client,result) {
        return deleteChannel(msg); 
    }
}


function deleteChannel(msg)
{
    client.env["tempchannel"].pop().delete();
}
