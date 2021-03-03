module.exports = {
    name: 'counting',
    aliases: [],
    execute(message, args, client, result) {
        return "blabla";
    }

}

//message objeto toal 
//args array de argumentos depois do comando 
// client bot object 
// result 


const createCsvWriter = require('csv-writer').createObjectCsvWriter;
let count = 0
let max_counting = []
let last_clients_array = []

const csvWriter = createCsvWriter({
  path: './database/count.csv',
  header: [
      {id: 'id_jogo', title: 'Jogo'},
      {id: 'date', title:'Data'},
      {id: 'loser', title: 'Perdedor'},
      {id: 'debt', title: 'Dividas'},
  ]
});




client.on('message', ({channel, content, member}) => {
  // Only do this for the counting channel of course
  // If you want to simply make this work for all channels called 'counting', you
  // could use this line:
  // if (client.channels.cache.filter(c => c.name === 'counting').keyArray().includes(channel.id))
  if (channel.id === client.channels.cache.find(r=>{r.name == 'counting'}).keys()[0]) {
        
    if (Number(content) === count + 1 && typeof last_clients_array != 'undefined' && member.user.id != last_clients_array[last_clients_array.length-1] ) {// If the message is the current count + 1...
      count++
      last_clients_array.push(member.user.id)
    } else {
      var unique = last_clients_array.slice(last_clients_array.length-20,last_clients_array.length).filter(onlyUnique);
      unique.forEach( (item, i, self) => self[i] = '<@item>');
      
      channel.send(`${member} lixou a contagem, estás a dever jolas aos seguintes membros:${unique.toString()}`).catch(console.error)

      count = 0
      const records = [
        {id_jogo: 'Bob',  date: new Date().toISOString().slice(0,19), loser:member.user.id, debt:unique}
      ];
      csvWriter.writeRecords(records)       // returns a promise
       .then(() => {
        console.log('...Done');
      });
    }
  }
})

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}









