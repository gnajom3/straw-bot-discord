exports.run = (client, message, args) => {
let memberCount = msg.guild.members.filter(member => !member.user.bot).size;
if(memberCount > 1){
  msg.channel.send(`There are ${memberCount} members in this server.`);
}else{
  msg.channel.send(`There is ${memberCount} member in this server.`)
}}