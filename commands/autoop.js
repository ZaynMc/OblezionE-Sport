const Discord = require("discord.js");

module.exports.run = async (bot, message, args, ops) => {


    //let role = message.guild.roles.find(r => r.id === "&543805253326209071");
    message.member.addRole("543805253326209071");
    
    message.delete();

}

module.exports.help = {
  name: "autoop"
}
