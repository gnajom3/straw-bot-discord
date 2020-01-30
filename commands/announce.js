exports.run = (client, message, args) => {
if(msg.member.roles.has(config.moderatorRole)){
    AnnouncementChannel = msg.guild.channels.find(channel => channel.name === '📝announcements📝');
    AnnouncementChannel.send(msg.content.slice(11));
  }else{
    msg.channel.send("Invalid permissions!");
  }
}
