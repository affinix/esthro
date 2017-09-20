const Discord = require(`discord.js`);

module.exports = (client, message) => {
    if (message.author.bot) return undefined;

    const settings = message.guild
        ? client.settings.get(message.guild.id)
        : client.config.defaultSettings;

    message.settings = settings;

    if (message.content.indexOf(settings.prefix) !== 0) return undefined;

    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g).slice(1);
    const command = message.content.split(/ +/g)[0].slice(settings.prefix.length);

    const level = client.permlevel(message);

    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    if (!cmd) return undefined;

    if (cmd && !message.guild && cmd.conf.guildOnly) {
        return message.channel.send(`Sorry, but this command is unavailable via private message. Please run this command in a guild.`);
    }

    if (level < client.levelCache[cmd.conf.permLevel]) {
        return message.channel.send(`[CMD] Sorry, you do not have permission to use this command. Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name}) and this command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    }

    client.log(`log`, `${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, `CMD`);
    cmd.run(client, message, args, level);
    const log = client.channels.get(`355665821395189760`);
    const embed = new Discord.RichEmbed()
        .setAuthor(`Command-log entry | Command Run | ${cmd.help.name.toProperCase()}`, message.author.avatarURL)
        .setThumbnail(message.author.avatarURL)
        .addField(`User:`, `${message.author.tag}`, true)
        .addField(`Command:`, `${cmd.help.name.toProperCase()}`, true)
        .addField(`Server:`, `${(message.channel.type === `dm` ? `DM` : message.guild.name)}`, true)
        .addField(`Channel:`, `${(message.channel.type === `dm` ? `DM` : message.channel.name)}`, true)
        .addField(`Args`, `${(args.length < 1 ? `No Args` : args.join(` `))}`, true)
        .addField(`Perm. Level`, `${(message.channel.type === `dm` ? `DM` : level)}`, true)
        .setTimestamp()
        .setFooter(`Guild ID: ${(message.channel.type === `dm` ? `DM` : message.guild.id)} | User ID: ${message.author.id}`)
        .setColor(0x42f4cb);
    log.send({ embed });
};
