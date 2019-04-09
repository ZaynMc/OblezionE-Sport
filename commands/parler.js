const Discord = require("discord.js");

module.exports.run = async (bot, message, args, ops) => {

    message.delete();

    bot.channels.get('506830992494034954').send('A ton avis Kuzan, comment je fais');
}

module.exports.help = {
  name: "automessage"
}
