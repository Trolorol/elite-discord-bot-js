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



let count = 0
let max_counting = []
let last_clients_array = []

let timeout

client.on('message', ({channel, content, member}) => {
  // Only do this for the counting channel of course
  // If you want to simply make this work for all channels called 'counting', you
  // could use this line:
  // if (client.channels.cache.filter(c => c.name === 'counting').keyArray().includes(channel.id))
  if (channel.id === client.channels.cache.find(r=>{r.name == 'counting'}).keys()[0]) {
    // You can ignore all bot messages like this
    if (member.user.bot) return
    
    if (Number(content) === count + 1 && typeof last_clients_array != 'undefined' && member.user.id != last_clients_array[last_clients_array.length-1] ) {// If the message is the current count + 1...
      count++
      last_clients_array.push(member.user.id)
      
      // Remove any existing timeout to count
      if (timeout) client.clearTimeout(timeout)
      // Add a new timeout
      timeout = client.setTimeout(
        // This will make the bot count and log all errors
        () => channel.send(++count).catch(console.error),
        // after 30 seconds
        30000
      )
    // If the message wasn't sent by the bot...
    } else if (member.id !== client.user.id) {
      // ...send a message because the person stuffed up the counting (and log all errors)
      channel.send(`${member} messed up!`).catch(console.error)
      // Reset the count
      count = 0
      // Reset any existing timeout because the bot has counted so it doesn't need to
      // count again
      if (timeout) client.clearTimeout(timeout)
    }
  }
})

client.login('your token')