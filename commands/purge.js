exports.run = (client, message, args) => {
if(msg.member.roles.has(config.moderatorRole)){
    if(!args) return msg.channel.send("You need to provide a number of messages to purge!")
    msg.channel.bulkDelete(args[1])
  }else{
    msg.channel.send("Invalid permissions!")
  }}