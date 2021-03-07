const hlp = require('../helper/helper.js');
module.exports = {
    name: 'getAllCons',
    args: '[type]',
    aliases: ["conselite"],
    description: 'Responds with the members connections that they have added',
    argsDescription: {"[type]":"(opcional) the type of connection:  \'steam\',\'battlenet\',\'twitch\',\'github\',\'youtube\',\'reddit\',\'facebook\',\'twitter\',\'spotify\',\'xbox\'"},
    execute(message, channel, member, args, client, result) {
        const typeOfCon = args.shift();
        result = "Connections found:\n"
        if(hlp.isUndefined(typeOfCon)){
            //return all the connections in the database in a table
            client.database.connections.forEach(element => {
                let cons = JSON.stringify(element,(key,value)=>{
                    if (key=="userid") return undefined;
                    return value;
                });
                const user =hlp.searchUser(client,element.userid);
                 result += user.username + "#" + user.discriminator + " : " + cons +"\n";
            });
        }else{
            client.database.connections.forEach(element => {
                const user =hlp.searchUser(client,element.userid)
                if(element[typeOfCon]!=""){ result += user.username + "#" + user.discriminator + " : " + element[typeOfCon] +"\n";}
            });
            //return only connections of that type
        }
        return result;
    }
}





