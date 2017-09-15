const Discord = require(`discord.js`);
const { version } = require(`discord.js`);

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const embed = new Discord.RichEmbed()
        .setAuthor(`Stats for ${client.user.tag}`, client.user.avatarURl)
        .setDescription(`Here are a few stats!`)
        .addField(`Mem Usage:`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}mb`, true)
        .addField(`Users:`, client.users.size.toLocaleString(), true)
        .addField(`Channels:`, client.channels.size.toLocaleString(), true)
        .addField(`Servers:`, client.guilds.size.toLocaleString(), true)
        .addField(`Discord.js:`, version, true)
        .addField(`Node.js:`, process.version, true)
        .addField(`Esthro:`, `v0.0.1`, true);
    message.channel.send({ embed });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: `User`,
};

exports.help = {
    name: `stats`,
    category: `Miscelaneous`,
    description: `Gives some stats about the bot`,
    extendedDescription: `I give some useful stats about myself!`,
    usage: `ping`,
};
