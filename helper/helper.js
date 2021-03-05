
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
    simpleEmbedMessage(result, title){
        let phrases = result.split("\n");
        let embeds=[];
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
    }
}