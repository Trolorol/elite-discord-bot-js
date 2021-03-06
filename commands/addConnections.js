const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const csvWriter = createCsvWriter({
    header: ["UserId","Steam","BattleNet","Twitch","GitHub","YouTube","Reddit","Facebook","Twitter","Spotify","Xbox"],
    path: '../database/helper.js'
});
//add a connection to the database array and write the array again