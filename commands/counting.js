module.exports = {
    name: 'counting',
    aliases: [],
    execute(message, channel, member, args, client, result) {
      game(channel, message, member) ;
        return "blabla";
    }

}

//message objeto toal 
//args array de argumentos depois do comando 
// client bot object 
// result 

function countingGame(channel, message, member) {
  let count = 0
  let max_counting = []
  let last_clients_array = []
  let timeout;
  // Only do this for the counting channel of course
  // If you want to simply make this work for all channels called 'counting', you
  // could use this line:
  // if (client.channels.cache.filter(c => c.name === 'counting').keyArray().includes(channel.id))
  if (channel.id === client.channels.cache.find(r=>{r.name == 'counting'}).keys()[0]) {
        
    if (Number(message.content) === count + 1 && typeof last_clients_array != 'undefined' && member.user.id != last_clients_array[last_clients_array.length-1] ) {// If the message is the current count + 1...
      count++
      last_clients_array.push(member.user.id)
      
      
      if (timeout) client.clearTimeout(timeout)// Remove any existing timeout to count
      timeout = client.setTimeout(// Add a new timeout
        () => channel.send(++count).catch(console.error),// This will make the bot count and log all errors
        30000// after 30 seconds
      )
    } else {
      var unique = last_clients_array.slice(last_clients_array.length-20,last_clients_array.length).filter(onlyUnique);

      unique.forEach( (item, i, self) => self[i] = '<@item>');
      
      channel.send(`${member} lixou a contagem, estás a dever jolas aos seguintes membros:`).catch(console.error)

      count = 0
      

      if (timeout) client.clearTimeout(timeout)// Reset any existing timeout because the bot has counted so it doesn't need to
    }
  }
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
