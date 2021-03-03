const csv = require('csv-parser');
const fs = require('fs');

module.exports = {
    name: 'comida',
    args: '',
    aliases: [],
    description: 'Responds with a food',
    argsDescription: {},
    execute(message, channel, member, args, client, result) {
        let foodlist = []
        let mention = args.shift();

        fs.createReadStream('./database/comida.csv')
        .pipe(csv())
        .on('data', (row) => {
            
            if(mention!=""){
                foodlist.push(row["Comida_Mention"].replace("[1]",mention));
            }else{
                foodlist.push(row["Comida"]);
            }
        })
        .on('end', () => {
            let count =Math.trunc(Math.random()*foodlist.length);
            message.channel.send(foodlist[count]);
        });
        return "";
    }
}

