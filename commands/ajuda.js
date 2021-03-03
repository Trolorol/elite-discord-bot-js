module.exports = {
    name: 'ajuda',
    aliases: [],

    args: '',
    description: 'Manual help',
    argsDescription: {},

    execute(message, channel, member, args, client, result) {
        return "\n Os comandos do BOT são os seguintes: \n **--ping** --> Pinga o Bot \n **--testes** --> Link dos testes/trabalhos dos cursos";
    }
}
