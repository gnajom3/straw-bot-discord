const Discord = require("discord.js");
const ms = require("ms");
const token = 'NjcxODU4NDYxMDU4OTI0NTU0.XjJ1hQ.7rO578AmND-ikldHHmE1NIgj1Rc';
const bot = new Discord.Client();
const config = require("./config.json");

bot.on('ready', () =>{
  console.log("Bot has started!")
  bot.user.setActivity(`s!help`)
  

})


bot.on('message', async msg =>{
  let args = msg.content.slice(config.prefix.length).trim().split(/ +/);
  if(msg.author.bot) return

  switch(args[0]){
    case "ping":
      const m = await msg.channel.send("Ping?");
      m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms.`)
    break;
    case "mute":
      if(msg.member.roles.has("671164901691097107")){
        var person  = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[1]));
        if(!person) return  msg.reply("I CANT FIND THE USER " + person)
    
        let mainrole = msg.guild.roles.get("671166866894487552");
        let role = msg.guild.roles.get("671936004868931626");
       
    
        if(!role) return msg.reply("Couldn't find the mute role.")
    
    
        let time = args[2];
        if(!time){
            return msg.reply("You didnt specify a time!");
        }
    
        person.removeRole(mainrole.id)
        person.addRole(role.id);
        audit()
    
    
        msg.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)
    
        setTimeout(function(){
           
            person.addRole(mainrole.id)
            person.removeRole(role.id);
            console.log(role.id)
            msg.channel.send(`@${person.user.tag} has been unmuted.`)
        }, ms(time));
    
    
      }else{
        msg.channel.send("Invalid permissions!")
      }
    break;
    case "announce":
      if(msg.member.roles.has("671164901691097107")){
        AnnouncementChannel = msg.guild.channels.find(channel => channel.name === '📝announcements📝');
        AnnouncementChannel.send(msg.content.slice(11));
        audit()
      }else{
        msg.channel.send("Invalid permissions!");
      }
    break;
    case "members":
      let memberCount = msg.guild.members.filter(member => !member.user.bot).size;
      if(memberCount > 1){
        msg.channel.send(`There are ${memberCount} members in this server.`);
      }else{
        msg.channel.send(`There is ${memberCount} member in this server.`)
      }
    break;
    case "purge":
      if(msg.member.roles.has("671164901691097107")){
      if(!args) return msg.channel.send("You need to provide a number of messages to purge!")
        msg.channel.bulkDelete(args[1])
        audit()
      }else{
        msg.channel.send("Invalid permissions!")
      }
    break;  
    case "help":
      const HelpEmbed = new Discord.RichEmbed().setTitle("StrawBot").setDescription("Check your DMs!").setFooter(msg.author.name);
       msg.channel.send(HelpEmbed);
      if(!msg.member.roles.has("671164901691097107"))
      HelpDM = new Discord.RichEmbed().setTitle("StrawBot").setDescription("**general:**\nping\nmembers")
       msg.author.send(HelpDM);
    break;
    case "kick":
      if(!msg.member.roles.has("671164901691097107")) return msg.channel.send("Invalid permissions!")
      member = msg.mentions.members.first()
      if(!member) return msg.channel.send("Provide a user to kick!")
      if(!member.kickable) return msg.channel.send("I cannot kick that user.")
      await member.kick(`Kicked by ${msg.author} using StrawBot™`).catch(error => message.channel.send(`I cannot kick that user.`));
      msg.channel.send(`Kicked ${member}`)
      audit();
    break;
    case "ban":
      if(!msg.member.roles.has("671164901691097107")) return msg.channel.send("Invalid permissions!")
      member = msg.mentions.members.first()
      if(!member) return msg.channel.send("Provide a user to ban!")
      if(!member.bannable) return msg.channel.send("I cannot ban that user.")
      await member.ban(`banned by ${msg.author} using StrawBot™`).catch(error => message.channel.send(`I cannot ban that user.`));
      msg.channel.send(`Banned ${member}!`)
      audit();
    break;
  }
  function audit() {
    const AuditChannel = msg.guild.channels.get("671925670187761685");
    console.log(`${msg} was run by ${msg.author}.`);
    AuditChannel.send(`${msg} was run by ${msg.author}.`);

  }
  
})

bot.login(token);