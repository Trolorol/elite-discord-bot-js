module.exports = {
    name: 'ping',
    args: '',
    aliases: ["p"],
    description: 'Responds with ping',
    argsDescription: {},
    execute(message, channel, member, args, client, result) {
        return "pong";
    }
}



