module.exports = (client, member) => {
    const settings = client.settings.get(member.guild.id);
    if (settings.welcomeEnabled !== `true`) return;
    const welcomeMessage = settings.welcomeMessage.replace(`{{user}}`, member.user.tag).replace(`{{guild}}`, member.guild.name);
    const channel = member.guild.channels.find(`name`, settings.welcomeChannel);
    if (!channel) return;
    channel.send(welcomeMessage).catch(console.error);
};
