const fs = require('fs');
const {  MessageAttachment } = require('discord.js');
module.exports = {
    name: 'codigo',
    args: '[numero de artigo]',
    aliases: [],
    description: 'Responds with the codigo article, if no number is provided then a pdf is downloaded',
    argsDescription: {},
    execute(message, channel, member, args, client, result) {

        let article = args.shift();
            if(article!="" && typeof article != "undefined" && article > 0){
                return "**Mostrando o codigo da praxe: \n Artigo "+article +"**\n"+client.database.codigo_da_praxe[article-1].Artigo;
            }else{
                message.channel.send(new MessageAttachment('./files/Codigo_da_Praxe.pdf', 'codigo.pdf')).catch((error)=>{message.channel.send(`Error sending file: ${error}`)});
                return "";
            }
    }
}

