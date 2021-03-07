const fs = require('fs');
const hlp = require('../helper/helper.js');
const csv = require("csv");
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
        const positionOfUser = hlp.findWithAttr(client.database.connections,0,userId);
        let arrayUser=[];
        const position =arrayCons.indexOf(typeOfCon);
        if(position >0){//existing connection
            console.log(client.database.connections);
            if(positionOfUser>-1){//existing user
                client.database.connections[positionOfUser][position] = nickName;
                arrayUser = client.database.connections[positionOfUser];
            }else{//new user
                arrayUser.push(userId);
                for (let i = 1; i < arrayCons.length; i++) {
                    arrayUser[i] = (i==position)?nickName:"";
                }
                if(hlp.isUndefined(client.database.connections)){
                    client.database.connections=[];   
                }
                client.database.connections.push(arrayUser);
                
            }
            var csvStream = csv.parse();
            var readStream = fs.createReadStream("database/connections.csv");
            var writeStream = fs.createWriteStream("database/connections.csv");
            let stringUser = "\""+arrayUser.join("\",\"")+"\"\n";
            let hasWritten = false;
            let headerWritten=false;
            let stringHeader = "\""+arrayCons.join("\",\"")+"\"\n";
            csvStream.on("data", (data)=> {  
                if(!headerWritten){
                    writeStream.write(stringHeader);
                    headerWritten=true;
                }
                console.log(data);
                if(data.split(",")[0]=="\""+userId+"\""){   
                    hasWritten=true;
                    writeStream.write(stringUser);
                }else{
                    writeStream.write(JSON.stringify(data));
                }
              })
              .on("end", function(){
                if(!hasWritten){
                    writeStream.write(stringUser);
                }
                console.log("done");
              })
              .on("error", function(error){
                  console.log(error)
              });  
            readStream.pipe(csvStream);

           // return hlp.mention(userId)+" now has "+hlp.bold(typeOfCon) +" connection with nickname " + hlp.bold(nickName)
           return "";
        }else{//unknown connection
            return "No connection named :" +hlp.bold(typeOfCon)+"";
        }
    }
}




