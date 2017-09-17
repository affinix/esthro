const Discord = require(`discord.js`);

exports.run = async (client, message, [action, name, ...content], level) => { // eslint-disable-line no-unused-vars
    const settings = message.guild
        ? client.settings.get(message.guild.id)
        : client.config.defaultSettings;

    const tags = client.tags.get(message.guild.id);

    if (!action) {
        const list = [];
        for (const i in tags) {
            list.push(i);
        }
        if (list.length < 1) {
            const embed = new Discord.RichEmbed()
                .addField(`:no_entry_sign: | Error!`, `No tags exist yet! Make one by doing ${settings.prefix}tags add [name] [content]`)
                .setColor(0xffffff);
            message.channel.send({ embed });
            return undefined;
        }
        const str = list.join(`, `);
        const embed = new Discord.RichEmbed()
            .addField(`Tags:`, `\`\`\`${str}\`\`\``)
            .setColor(0xffffff);
        message.channel.send({ embed });
        return;
    }

    switch (action.toLowerCase()) {
    case `add`:
        if (!level >= 2) return;
        if (!name) {
            const embed = new Discord.RichEmbed()
                .addField(`:no_entry_sign: | Syntax Error!`, `Please give me the name and content of the tag! \`${settings.prefix}tags [add/edit/list/delete] <name> <content>\``)
                .setColor(0xffffff);
            message.channel.send({ embed });
            return undefined;
        }
        if (!tags.hasOwnProperty(name)) {
            if (!content) {
                const embed = new Discord.RichEmbed()
                    .addField(`:no_entry_sign: | Syntax Error!`, `Please give me the content of the tag! \`${settings.prefix}tags [add/edit/list/delete] <name> <content>\``)
                    .setColor(0xffffff);
                message.channel.send({ embed });
                return undefined;
            }
            const thing = content.join(` `);
            tags[name] = thing;
            client.tags.set(message.guild.id, tags);
            const embed = new Discord.RichEmbed()
                .addField(`Success!`, `I have created a new tag named \`${name}\` with the content of \`${content.join(` `)}\``)
                .setColor(0xffffff);
            message.channel.send({ embed });
        } else {
            if (!name) {
                const embed = new Discord.RichEmbed()
                    .addField(`:no_entry_sign: | Syntax Error!`, `Please give me the name and content of the tag! \`${settings.prefix}tags [add/edit/list/delete] <name> <content>\``)
                    .setColor(0xffffff);
                message.channel.send({ embed });
                return undefined;
            }
            if (!content) {
                const embed = new Discord.RichEmbed()
                    .addField(`:no_entry_sign: | Syntax Error!`, `Please give me the content of the tag! \`${settings.prefix}tags [add/edit/list/delete] <name> <content>\``)
                    .setColor(0xffffff);
                message.channel.send({ embed });
                return undefined;
            }
            const embed = new Discord.RichEmbed()
                .addField(`:no_entry_sign: | Error!`, `That tag already exists! Want to edit it? Do \`${settings.prefix}tags edit ${name} ${content.join(` `)}\``)
                .setColor(0xffffff);
            message.channel.send({ embed });
            return undefined;
        }
        break;
    case `delete`:
        if (!level >= 2) return;
        if (!name) {
            const embed = new Discord.RichEmbed()
                .addField(`:no_entry_sign: | Syntax Error!`, `Please give me the name of the tag! \`${settings.prefix}tags [add/edit/list/delete] <name> <content>\``)
                .setColor(0xffffff);
            message.channel.send({ embed });
            return undefined;
        }
        if (!tags.hasOwnProperty(name)) {
            const embed = new Discord.RichEmbed()
                .addField(`:no_entry_sign: | Error!`, `That tag does not exist! Want to add it? Do \`${settings.prefix}tags add ${name} [content]\``)
                .setColor(0xffffff);
            message.channel.send({ embed });
        } else {
            try {
                delete tags[name];
                client.tags.set(message.guild.id, tags);
                const embed = new Discord.RichEmbed()
                    .addField(`Success!`, `I have deleted \`${name}\``)
                    .setColor(0xffffff);
                message.channel.send({ embed });
            } catch (error) {
                message.channel.send(`:no_entry_sign: | Something went wrong! \`${error}\``);
                console.log(error.stack);
            }
        }
        break;
    case `list`:
        const list = [];
        for (const i in tags) {
            list.push(i);
        }
        if (list.length < 1) {
            const embed = new Discord.RichEmbed()
                .addField(`:no_entry_sign: | Error!`, `No tags exist yet! Make one by doing ${settings.prefix}tags add [name] [content]`)
                .setColor(0xffffff);
            message.channel.send({ embed });
            return undefined;
        }
        const str = list.join(`, `);
        const embed = new Discord.RichEmbed()
            .addField(`Tags:`, `\`\`\`${str}\`\`\``)
            .setColor(0xffffff);
        message.channel.send({ embed });
        break;
    case `edit`:
        if (!level >= 2) return;
        if (!name) {
            const embed = new Discord.RichEmbed()
                .addField(`:no_entry_sign: | Syntax Error!`, `Please give me the name of the tag! \`${settings.prefix}tags [add/edit/list/delete] <name> <content>\``)
                .setColor(0xffffff);
            message.channel.send({ embed });
            return undefined;
        }
        if (!tags.hasOwnProperty(name)) {
            const embed = new Discord.RichEmbed()
                .addField(`:no_entry_sign: | Error!`, `That tag does not exist! Want to add it? \`Do ${settings.prefix}tags add ${name} <content>\``)
                .setColor(0xffffff);
            message.channel.send({ embed });
        } else {
            if (!content) {
                const embed = new Discord.RichEmbed()
                    .addField(`Syntax Error!`, `Please give me the content of the tag! \`${settings.prefix}tags [add/edit/list/delete] <name> <content>\``)
                    .setColor(0xffffff);
                message.channel.send({ embed });
                return undefined;
            }
            const thing = content.join(` `);
            tags[name] = thing;
            client.tags.set(message.guild.id, tags);
            const embed = new Discord.RichEmbed()
                .addField(`Success!`, `I have edited the tag named \`${name}\` to \`${content.join(` `)}\``)
                .setColor(0xffffff);
            message.channel.send({ embed });
        }
        break;
    default:
        const tag = tags[action];
        if (!tag) {
            const list = [];
            for (const i in tags) {
                list.push(i);
            }
            if (list.length < 1) {
                const embed = new Discord.RichEmbed()
                    .addField(`:no_entry_sign: | Error!`, `No tags exist yet! Make one by doing ${settings.prefix}tags add [name] [content]`)
                    .setColor(0xffffff);
                message.channel.send({ embed });
                return undefined;
            }
            const str = list.join(`, `);
            const embed = new Discord.RichEmbed()
                .addField(`Tags:`, `\`\`\`${str}\`\`\``)
                .setColor(0xffffff);
            message.channel.send({ embed });
        }
        message.channel.send(tag);
        break;
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [`tag`, `t`],
    permLevel: `User`,
};

exports.help = {
    name: `tags`,
    category: `Utility`,
    description: `Show or modify tags.`,
    extendedDescription: `\`\`\`e!tags add [name] [content]\ne!tags delete [name]\ne!tags edit [existingTag] [newContent]\ne!tags list\`\`\``,
    usage: `tags [add/remove/edit/list/tag] <name> <content>`,
};
