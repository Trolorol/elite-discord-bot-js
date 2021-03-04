module.exports = {
  name: 'testes',
  aliases: [],

  args: '',
    description: 'Link dos testes/trabalhos dos cursos',
    argsDescription: {},

  execute(message, channel, member, args, client, result) {
    return client.env.testes_folder;
  },
};
