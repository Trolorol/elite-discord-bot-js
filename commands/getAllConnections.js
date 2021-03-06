const hlp = require('../helper/helper.js');
module.exports = {
    name: 'getAllCons',
    args: '[type]',
    aliases: ["consElite"],
    description: 'Responds with the members connections that they have added',
    argsDescription: {"[type]":"(opcional)"},
    execute(message, channel, member, args, client, result) {
        const typeOfCon = args.shift();
        if(hlp.isUndefined(typeOfCon)){
            //return all the connections in the database in a table
        }else{
            //return only connections of that type
        }
        return "";
    }
}





