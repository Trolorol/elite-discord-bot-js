const createCsvWriter = require('csv-writer').createObjectCsvWriter;
module.exports = {
    name: 'counting',
    aliases: [],
    execute(message, channel, member, args, client, result) {
        return'';
    },



countingGame(channel, message, member, client) {

  // Only do this for the counting channel of course
  // If you want to simply make this work for all channels called 'counting', you
  // could use this line:
  // if (client.channels.cache.filter(c => c.name === 'counting').keyArray().includes(channel.id))
  if (channel.id === client.env.count_room_id) {

    if (Number(+message.content) === client.env.count + 1 && typeof client.env.last_clients_array != 'undefined' && member.user.id != client.env.last_clients_array[client.env.last_clients_array.length-1] ) {// If the message is the current count + 1...
      client.env.count++
      client.env.last_clients_array.push(member.user.id)
      message.react('✅')

    } else {
      var unique = client.env.last_clients_array.slice(((client.env.last_clients_array.length-20<0)?0:client.env.last_clients_array.length-20),client.env.last_clients_array.length).filter(this.onlyUnique).filter(r => r!=member.user.id)
      unique.forEach( (item, i, self) => self[i] = `<@${item}>`);

      message.react('🤬')
      if (unique.length==0){
        channel.send(`${member} lixou a contagem, não há ninguem para pagar jolas, estás mesmo a tentar jogar sozinho?`)
      }else{
        channel.send(`${member} lixou a contagem, estás a dever jolas aos seguintes membros:${unique.toString()}`).catch(console.error)
      }
      client.env.count = 0
      client.env.last_clients_array = []
      const records = [
        {date: new Date().toISOString().slice(0,19), loser:member.user.id, debt:JSON.stringify(unique)}
      ];
      const csvWriter = createCsvWriter({
        path: './database/count.csv',
        header: [
            {id: 'date', title:'Data'},
            {id: 'loser', title: 'Perdedor'},
            {id: 'debt', title: 'Dividas'},
        ],
        append:true
      });
      csvWriter.writeRecords(records) // returns a promise
    }
  }
},

 onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}


}