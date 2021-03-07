const fs = require('fs');
const hlp = require('../helper/helper.js');
const csv = require("csv-parser");
const arrayCons = ['userid','steam','battlenet','twitch','github','youtube','reddit','facebook','twitter','spotify','xbox'];
//add a connection to the database array and write the array again

module.exports = {
    name: 'addCon',
    args: '[type] [nick]',
    aliases: [],
    description: 'Adds/Substitutes a connection to the database for the user that uses the command',
    argsDescription: {"[type]":"Types available: \'steam\',\'battlenet\',\'twitch\',\'github\',\'youtube\',\'reddit\',\'facebook\',\'twitter\',\'spotify\',\'xbox\'",
                      "[nick]":"The nick of the connection itself"},
    execute(message, channel, member, args, client, result) {
        const typeOfCon  = args.shift();
        const nickName = args.join(" ");
        const userId = message.author.id;
        const positionOfUser = hlp.findWithAttr(client.database.connections,"userid",userId);
        let jsonUser={};
        const position =arrayCons.indexOf(typeOfCon);
        if(position >0){//existing connection
            console.log(client.database.connections);
            if(positionOfUser>-1){//existing user
                client.database.connections[positionOfUser][arrayCons[position]] = nickName;
                jsonUser = client.database.connections[positionOfUser];
            }else{//new user
                jsonUser.userid=userId;
                for (let i = 1; i < arrayCons.length; i++) {
                    jsonUser[arrayCons[i]] = (i==position)?nickName:"";
                }
                if(hlp.isUndefined(client.database.connections)){
                    client.database.connections=[];   
                }
                client.database.connections.push(jsonUser);
                
            }
            console.log(jsonUser);
            var writeStream = fs.createWriteStream("database/connections.csv");
            let stringHeader = "\""+arrayCons.join("\",\"")+"\"\n";
            let toWrite=stringHeader;
            console.log(client.database.connections);
            client.database.connections.forEach(element => {
                arrayCons.forEach((i,index,array)=>{toWrite+="\""+element[i]+"\""+(index==array.length-1)?"":",";});
                toWrite+="\n";
            });
            writeStream.write(toWrite);
            
            return hlp.mention(userId)+" now has "+hlp.bold(typeOfCon) +" connection with nickname " + hlp.bold(nickName)
        }else{//unknown connection
            return "No connection named :" +hlp.bold(typeOfCon)+"";
        }
    }
}




