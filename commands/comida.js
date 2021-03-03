const fs = require('fs');

module.exports = {
    name: 'comida',
    args: '',
    aliases: [],
    description: 'Responds with a food',
    argsDescription: {},
    execute(message, channel, member, args, client, result) {

        let mention = args.shift();
        let count =Math.trunc(Math.random()*client.database["comida"].length);
            if(mention!="" && typeof mention != "undefined"){

                return client.database["comida"][count]["Comida_Mention"].replace("[1]",mention);
            }else{
                return client.database["comida"][count]["Comida"].replace("[1]",mention);
            }
    }
}

