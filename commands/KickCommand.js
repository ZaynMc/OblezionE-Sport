const Discord = require("discord.js");

module.exports.run = async (bot, message, args, ops) => {

  

    if(args[0] == null) {
        message.delete();

        message.reply(`Vous n'avez pas précisez ou le joueur n'existe pas, l'usage correcte de cette commande est : **.kick @User**`);

        return;
    }

    if(!message.channel.permissionsFor(message.member).hasPermission("KICK_MEMBERS")) {
        message.delete();
        //LOG
        tools.log(message.author.name + "NOT PERMISSION TO BAN PLAYER", message)
        return;
    }

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) {
        message.author.send("Bonjour, vous avez essayer d'éxecuter la commande a!kick mais la personne ciblée n'existe pas");
        message.delete();
        return;
    }

    var member = message.mentions.members.first();

    if(!member.kickable) {
        message.author.send("Bonjour, l'utilisateur ne peut être kick");
        message.delete();
        return;
    }

    member.kick("ASCALON BOT");
}

module.exports.help = {
    name: "kick"
  }
