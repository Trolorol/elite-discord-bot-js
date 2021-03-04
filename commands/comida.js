const fs = require('fs');
const hlp = require('../helper/helper.js');
module.exports = {
    name: 'comida',
    args: '',
    aliases: [],
    description: 'Responds with a food',
    argsDescription: {},
    execute(message, channel, member, args, client, result) {

        let mention = args.shift();
        
            if(mention!="" && typeof mention != "undefined"){

                return hlp.nextRandom(client.database.comida).Comida_Mention.replace("[1]",mention);
            }else{
                return hlp.nextRandom(client.database.comida).Comida.replace("[1]",mention);
            }
    }
}

