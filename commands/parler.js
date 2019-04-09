const Discord = require("discord.js");

module.exports.run = async (bot, message, args, ops) => {

    message.delete();

    bot.channels.get('506830992494034954').send('Kuzan, tu aimes le bot ? x)');
}

module.exports.help = {
  name: "automessage"
}
