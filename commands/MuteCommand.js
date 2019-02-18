const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args, ops) => {

  //!mute @user 1s/m/h/d

  message.delete();

  if(!message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES")) {

    //message deleted
    message.delete();

    message.reply("Vous ne pouvez pas utiliser cette commande.").then(message => message.delete(5000));

    //Return
    return;
}


  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply(`Vous n'avez pas précisez ou le joueur n'existe pas, l'usage correcte de cette commande est : **.mute @User 1s/m/h/d**`).then(message => message.delete(5000));


  let muterole = message.guild.roles.find(`name`, 'muted');
  //start of create role
  if(!muterole){
    try{

      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SPEAK: false

        });

      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.channel.send("Vous n'avez pas précisez le temps.").then(message => message.delete(5000));

  await(tomute.addRole(muterole.id));
  //message.reply(`<@${tomute.id}> à été mute pour ${ms(ms(mutetime))}`).then(message => message.delete(5000));;

  message.channel.send({embed: {
    color: 3447003,
    author: {
      name: "Oblezion Boss",
      icon_url: "https://i.imgur.com/qQoSPge.jpg"
    },
    title: `Le joueur ${tomute.displayName} à été mute pour ${ms(ms(mutetime))}`,
    description: "Une erreur ? Contactez nous en envoyant un message au Oblezion Boss#4060",
    timestamp: new Date(),
    footer: {
      icon_url: "https://i.imgur.com/318H4Xw.png",
      text: "© Created by Zayn#0607"
    }
  }
});

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    //message.channel.send(`<@${tomute.id}> est unmute !`).then(message => message.delete(5000));;

    message.channel.send({embed: {
      color: 3447003,
      author: {
        name: "Oblezion Boss",
        icon_url: "https://i.imgur.com/qQoSPge.jpg"
      },
      title: `Le joueur ${tomute.displayName} à été unmute !`,
      timestamp: new Date(),
      footer: {
        icon_url: "https://i.imgur.com/318H4Xw.png",
        text: "© Created by Zayn#0607"
      }
    }
  });
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "mute"
}
