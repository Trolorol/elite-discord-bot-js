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
        fs.createReadStream('./database/comida.csv')
        .pipe(csv())
        .on('data', (row) => {
            foodlist.push(row["Comida"]);
        })
        .on('end', () => {
            let count =Math.trunc(Math.random()*foodlist.length);
            message.channel.send(foodlist[count]);
        });
        return "";
    }
}

