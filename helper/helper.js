const Discord = require('discord.js');
module.exports = {
    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    },
    nextRandom(array){
        return array[Math.trunc(Math.random()*array.length)]
    },
    random(scalar){
        return Math.trunc(Math.random()*scalar)
    },
    mention(userId){
        return "<@"+userId+">"
    },
    quote(text){
        return "```"+text+"```"
    },
    bold(text){
        return "**"+text +"**"
    },
    simpleEmbedMessage(result, title){
        let condensedPhrases = seperateResultBySize(result);
        condensedPhrases.forEach(
            (value,index) => {
            if(value!=""){
                if(index==0){
                    const embed= new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(title.substring(0,256))
                    .setDescription(value.substring(0,2048))
                    embeds.push(embed);
                }else{
                    const embed= new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setDescription(value.substring(0,2048))
                    embeds.push(embed);
                }
            }
        });
        return embeds;
    },
    seperateResultIntoWritableArray(result){
        let phrases = result.split("\n");
        let condensedPhrases = []
        let i = 0
        phrases.forEach((value,index) => {
            if(typeof condensedPhrases[i] == "undefined"){
                condensedPhrases[i]=value+"\n";
            }else if(condensedPhrases[i].concat(value).length>=2000){
                i++;
                condensedPhrases[i]=value+"\n";
            }else{
                condensedPhrases[i]+=value+"\n";
            }
        });
        return condensedPhrases;
    },
    isUndefined(value){
        return typeof value=="undefined";
    },
    isNotUndefined(value){
        return typeof value!="undefined";
    },
    writeArrayToChannel(array,channel){
        array.forEach((element)=>{
            channel.send(element);
        });
    },
    findWithAttr(array, attr, value) {
        if(this.isUndefined(array)) return -1;
        for(var i = 0; i < array.length; i += 1) {
            console.log("comparing : "+array[i][attr]+" "+value)
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }
}