module.exports = {
    name: 'help',
    aliases: ['h'],
    args: '[commandName]',
    description: 'Shows the commands that the bot can execute, can also help with a specific command if the command name is put after it',
    argsDescription: {
        '[commandName]': '(optional) name of the command to view arguments'
    },
    execute(message, channel, member, args, client, result) {
        result = ""
        let firstArgs = args.shift();
        if (firstArgs == undefined) {
            const commandshelp = "";
            let iter = client.commands.size;
            for (const [name, command] of client.commands) {
                result += (((!--iter) ? "└► " : "├► ") + commandshelp + "**"+client.env.PREFIX+name + "** " + command.args + " : " + command.description) + "\n";
            }
        } else {
            firstArgs = firstArgs.toLowerCase();
            if (client.commands.get(firstArgs) != undefined) {
                const commandi = client.commands.get(firstArgs);
                result += ("├► Command " + commandi.name) + "\n";
                result += ("├► " + commandi.description) + "\n";
                const argsList = commandi.args.split(/ +/);
                let iter = argsList.length;
                if (commandi.args === '') {
                    result += ("└► No Args") + "\n";
                } else {
                    for (const arg of argsList) {
                        if (iter == argsList.length) {
                            result += ("├► Args(" + iter + "):") + "\n";
                        }
                        const argDesc = commandi.argsDescription[arg];
                        result += (((!--iter) ? "└───► " : "├───► ") + arg + " : " + argDesc) + "\n";
                    }
                }
            } else {
                result += ("└► Command not recognized : " + args) + "\n";
            }
        }
        return result;
    }
}