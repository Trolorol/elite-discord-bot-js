module.exports = {
    name: 'scr',
    args: '',
    aliases: [],
    description: 'Sets the channel as counting room',
    argsDescription: {},
    execute(message, channel, member, args, client, result) {
        client.env['count_room_id'] = channel.id
        return 'Channel set as counting room'
    }
}


