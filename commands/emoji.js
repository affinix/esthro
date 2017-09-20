const Discord = require(`discord.js`);

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const emoji = message.guild.emojis;
    let msg = ``;
    let temp = 2;
    emoji.forEach((e) => {
        if (temp % 4 == 1) {
            msg += `${e.toString()}\n`;
            temp += 1;
        } else {
            msg += `${e.toString()} `;
            temp += 1;
        }
    });

    if (msg === ``) return;

    const embed = new Discord.RichEmbed()
        .addField(`This server's emoji:`, `${msg}`)
        .setColor(0xffffff);

    message.channel.send({ embed });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: `User`,
};

exports.help = {
    name: `emoji`,
    category: `Utility`,
    description: `Lists all custom emoji.`,
    extendedDescription: `I will list all of the custom emoji that the server has`,
    usage: `emoji`,
};
