const Discord = require(`discord.js`);

exports.run = (client, message, args, level) => {
    if (!args[0]) {
        const settings      = message.guild // eslint-disable-line
            ? client.settings.get(message.guild.id)
            : client.config.defaultSettings;
        const myCommands    = message.guild // eslint-disable-line
            ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level)
            : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level && cmd.conf.guildOnly !== true);
        const commandNames  = myCommands.keyArray(); // eslint-disable-line
        const longest       = commandNames.reduce((long, str) => Math.max(long, str.length), 0); // eslint-disable-line
        let currentCategory = ``;
        let output          = `> Use ${settings.prefix}help [command] for more details\n`; // eslint-disable-line
        const sorted = myCommands.sort((p, c) => (p.help.category > c.help.category //eslint-disable-line 
            ? 1
            : p.help.name > c.help.name && p.help.category === c.help.category
                ? 1
                : -1));
        sorted.forEach((c) => {
            const cat = c.help.category.toProperCase();
            if (currentCategory !== cat) {
                output += `\n> ${cat}:\n`;
                currentCategory = cat;
            }
            output += `   ${settings.prefix}${c.help.name}${` `.repeat(longest - c.help.name.length)} : ${c.help.description}\n`;
        });
        const embed = new Discord.RichEmbed()
            .setAuthor(`Commands`, client.user.avatarURL)
            .setDescription(`\`\`\`md\n${output}\n\`\`\``)
            .setColor(0xffffff);
        message.channel.send({ embed, split: `true` });
    } else {
        const settings = message.guild // eslint-disable-line
            ? client.settings.get(message.guild.id)
            : client.config.defaultSettings;
        let command = args[0];
        if (client.commands.has(command)) {
            command = client.commands.get(command);
            if (level < client.levelCache[command.conf.permLevel]) return;
            const embed = new Discord.RichEmbed()
                .setAuthor(`Help | ${settings.prefix}${command.help.name}`, client.user.avatarURL)
                .addField(`Description:`, `${command.help.extendedDescription}`)
                .addField(`Usage:`, `\`\`\`${settings.prefix}${command.help.usage}\`\`\``)
                .setColor(0xffffff);
            message.channel.send({ embed });
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [`h`, `halp`],
    permLevel: `User`,
};

exports.help = {
    name: `help`,
    category: `System`,
    description: `Displays all the available commands.`,
    extendedDescription: `I dispaly all of the commands that you can access for your permission level!`,
    usage: `help [command]`,
};
