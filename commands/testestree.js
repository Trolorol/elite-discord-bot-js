const mega = require('megajs');
const hlp = require('../helper/helper.js');

module.exports = {
    name: 'testestree',
    args: '[path]',
    aliases: [],
    description: 'Gives a list of the files in the mega storage of testes, if a path is provided, it will show only that path\'s children example: Elite/Engenharia Informática',
    argsDescription: {},
    execute(message, channel, member, args, client, result) {
        const path = args.join(" ");
        const folder = mega.file(client.env.testes_folder);
        folder.loadAttributes((err, folder) => {
            if (err) 
                channel.send(" :x: Not possible to view file tree at this moment: "+ err);
            if(typeof path == "undefined"){
                let result = "";
                result += loadTreeChildren(client,folder,0,false);
                channel.send(embedMessage(result,"Showing file tree for testes folder"));
            }else{
                pathArgs = path.toString().replace(/\/$/, '').split("/");
                pathArgs.shift();
                const goToFolderByPathResult = goToFolderByPath(folder,pathArgs);
                if(goToFolderByPathResult[0]){
                    let result = "";
                    result += loadTreeChildren(client,goToFolderByPathResult[1],0,false);
                    let embeds=hlp.simpleEmbedMessage(result,"Showing file tree for "+goToFolderByPathResult[1].name+" folder");
                    hlp.writeArrayToChannel(embeds,channel);
                }else{
                    channel.send(goToFolderByPathResult[1]);
                }
            }
          })        
        return "";
    }
}

function loadTreeChildren(client,folder,depth,isLast=false,maxDepth=4){
    let result ="";
    if(folder.directory){
        result = "⠀    ".repeat(depth)+ "└►["+folder.name+"]("+client.env.testes_folder+"/folder/"+folder.downloadId[1]+")/";
        if(typeof folder.children != "undefined"){
            
            if(maxDepth<=depth+1) return result + "(...)\n"
            result +=  "\n"
            folder.children.forEach((i, idx, array) => {
                result +=loadTreeChildren(client,i,depth + 1,idx==array.length-1,maxDepth);
            });
        }else{
            result += "(Empty)\n";
        }
    }else{
        return "⠀    ".repeat(depth)+"└►["+folder.name+"]("+client.env.testes_folder+"/file/"+folder.downloadId[1]+") \n";
    }
    return result;
}

function goToFolderByPath(folder,path){
    
    if(typeof path[0]=="undefined"){
    
        return [true,folder];
    }
    if(folder.directory){
        if(typeof folder.children != "undefined"){
            let result;
            var BreakException = {};
            try {
                folder.children.forEach((i, idx, array) => {
                    if(i.name.normalize() === path[0].normalize()){
                        path.shift();
                        result=goToFolderByPath(i,path);
                        throw BreakException;
                    }
                });
                return [false,"Invalid Path "+ folder.name +" not found"]
            }catch(e){
                if (e !== BreakException) throw e;
                return result;
            }
        }else{
            return [false,"Invalid Path "+ folder.name +" has no children"]
        }   
    }else{
        return [false,"Invalid Path "+ folder.name +" isn't a directory"]
    }
}


