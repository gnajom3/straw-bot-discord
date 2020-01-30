exports.run = (client, message, args) => {
if(msg.member.roles.has(config.moderatorRole)){
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


    msg.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`)

    setTimeout(function(){
       
        person.addRole(mainrole.id)
        person.removeRole(role.id);
        console.log(role.id)
        msg.channel.send(`@${person.user.tag} has been unmuted.`)
    }, ms(time));


  }else{
    msg.channel.send("Invalid permissions!")
  }}