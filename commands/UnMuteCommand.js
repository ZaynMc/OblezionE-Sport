module.exports.run = async (bot, message, args, ops) => {

    message.delete();
    
    if(!message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES")) {

      //message deleted
      message.delete();
  
      message.reply("Vous ne pouvez pas utiliser cette commande.").then(message => message.delete(5000));
  
      //Return
      return;
  }
    //CHECK IF MENTION USER EXIST
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return;
  
    let muterole = message.guild.roles.find(`name`, 'muted');
  
    if(message.member.roles.has(muterole.id)) {
      //REMOVE ROLE TO USER
      tomute.removeRole(muterole.id);
      
      //SEND MESSAGE FOR VALID UNMUTE
      //message.channel.send(`<@${tomute.id}> est unmute !`).then(message => message.delete(5000));

      message.channel.send({embed: {
        color: 3447003,
        author: {
          name: "Oblezion Boss",
          icon_url: "https://i.imgur.com/qQoSPge.jpg"
        },
        title: `Le joueur <@${tomute.id}> à été unmute !`,
        timestamp: new Date(),
        footer: {
          icon_url: "https://i.imgur.com/318H4Xw.png",
          text: "© Created by Zayn#0607"
        }
      }
    });
    
  }
  }
  
  module.exports.help = {
    name: "unmute"
  }
  