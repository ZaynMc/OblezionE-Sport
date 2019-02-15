const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
const token = process.env.token;

const serverStats = {
  guildID: '546051160105156619',
  totalUsersID: '544133113224232970',
  memberCountID: '544133112381046785',
  botCountID: '544133114168082432'
}

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);

  bot.user.setActivity('@ZaynMC_YT', {type: "LISTENING"});
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

   let ops = {
   }

  let prefix = ".";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args, ops, tools);

});

bot.on('guildMemberAdd', member => {
   bot.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`); // total users
   bot.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`); // total members (not inscued bot)
   bot.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`); // bot count
});

bot.on('guildMemberRemove', member => {

   bot.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`); // total users
   bot.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.members.filter(m => !m.user.bot).size}`); // total members (not inscued bot)
   bot.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.user.bot).size}`); // bot count
});

bot.on("message", async message => {

  if(message.author.bot) return;

  if(message.channel.type !== 'text') {

    let active = await db.fetch(`support_${message.author.id}`);

    let guild = bot.guilds.get('488381712351494148');

    let channel, found = true;

    try {
      if(active) bot.channels.get(active.channelID).guild;
    }catch(e) {
      found = false;
    }

    if(!active || !found) {

      active = {};

      channel = await guild.createChannel(`${message.author.username}-${message.author.discriminator}`);

      channel = await channel.setParent('546079393114488832');

      try {
            let ascalonall = guild.roles.find(`name`, "⚜️~×Staff");


            channel.overwritePermissions(ascalonall, {
            CREATE_INSTANT_INVITE: false,
            KICK_MEMBERS: false,
            BAN_MEMBERS: false,
            ADMINISTRATOR: false,
            MANAGE_CHANNELS: false,
            MANAGE_GUILD: false,
            ADD_REACTIONS: false,
            VIEW_AUDIT_LOG: false,
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false
          });

        } catch(e){
          console.log(e.stack);
        }

      let author = message.author;

      const newChannel = new Discord.RichEmbed()
      .setColor(0x36393e)
      .setAuthor(author.tag)
      .setFooter('Support Ticket Created')
      .addField('User', author)
      .addField('ID', author.id)

      await channel.send(newChannel);

      author.send(":flag_mf: Merci d'avoir contacté le support ! Un membre du staff va vous contactez dans les plus brefs délais \n:flag_lr: Thank you for contacting the support ! A member of the staff will contact you as soon as possible");

      active.channelID = channel.id;
      active.targetID = author.id;

    }


    channel = bot.channels.get(active.channelID);

    message.author.send(":flag_mf: Votre message a été envoyé \n:flag_lr: Your message has been sent");

    const embed = new Discord.RichEmbed()
    .setColor(0x36393e)
    .setAuthor(message.author.tag)
    .setDescription(message.content)
    .setFooter(`Message Recieved -- ${message.author.tag}`)

    await channel.send(embed);

    db.set(`support_${message.author.id}`, active);
    db.set(`supportChannel_${channel.id}`, message.author.id);
    return;
  }

  let support = await db.fetch(`supportChannel_${message.channel.id}`);

  if(support) {

    support = await db.fetch(`support_${support}`);

    let supportUser = bot.users.get(support.targetID);
    if(!supportUser) return message.channel.delete();

    if(message.content.toLowerCase() == '?complete') {

        message.channel.delete();

        db.delete(`support_${support.targetID}`);
        return;
          }

    bot.users.get(support.targetID).send(message.content)
    message.delete();


    return message.channel.send(message.content);
  }
  });

 bot.login(token);