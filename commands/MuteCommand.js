const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args, ops) => {

  //!mute @user 1s/m/h/d

  message.delete();

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return;

  if(tomute.hasPermission("MANAGE_MESSAGES")) {tools.log('CHECK COMMAND MUTE NOT PLAYER HAS PERMISSION', message); return;}
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
  message.reply(`<@${tomute.id}> à été mute pour ${ms(ms(mutetime))}`).then(message => message.delete(5000));;

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> est unmute !`).then(message => message.delete(5000));;
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "mute"
}
