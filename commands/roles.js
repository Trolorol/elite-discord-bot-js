module.exports = {
    name: 'roles',
    args: '[user]',
    aliases: [],
    description: 'Responds with roles and their ids, if a user is specified, then returns the roles that the user has ',
    argsDescription: {},
    executionPermittedRoles : ["Admin","Elite Bot Project Developer"],
    execute(message, channel, member, args, client, result) {
        const userMention = args.shift();
        let roles = "";
        if(typeof userMention == "undefined"){
            message.guild.roles.cache.forEach(element => {    
                roles += element.id + " " + element.name.replace("@","") + "\n";
            });
        }else{
            const userId = message.mentions.users.first().id;
            const memberMentioned =channel.members.get(userId);
            memberMentioned.roles.cache.forEach(element => {
                roles += element.id + " " + element.name.replace("@","") + "\n";
            });
        }
        return `Roles found \n${roles}`;
    }
}



