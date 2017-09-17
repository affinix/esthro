const Discord = require(`discord.js`);

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const perms = message.guild.member(client.user).hasPermission(`MANAGE_ROLES_OR_PERMISSIONS`);
    const roles = message.guild.roles.filter(r => r.name.startsWith(`#!`));
    const rolesM = message.guild.roles.filter(r => r.name.startsWith(`#!`)).map(r => r.name);
    const mRoles = message.mentions.roles;
    const settings = message.guild
        ? client.settings.get(message.guild.id)
        : client.config.defaultSettings;

    console.log(roles);
    console.log(mRoles);

    if (!perms) {
        const embed = new Discord.RichEmbed()
            .addField(`:no_entry_sign: | Error!`, `I do not have permissions to do that! Please make sure I have the \`Manage Roles\` permission!`)
            .setColor(0xffffff);
        message.channel.send({ embed });
        return undefined;
    }

    if (rolesM.length < 1) {
        const embed = new Discord.RichEmbed()
            .addField(`:no_entry_sign: | Error!`, `There are no valid roles for me to give! I can only give people roles with names starting with \`#!\``)
            .setColor(0xffffff);
        message.channel.send({ embed });
        return undefined;
    }

    if (args.length < 1) {
        let output = ``;
        for (const i in rolesM) {
            const role = roles.find(`name`, `${rolesM[i]}`);
            output += `<@&${role.id}> \n`;
        }
        const embed = new Discord.RichEmbed()
            .addField(`Avaliable Roles:`, `${output}`)
            .setColor(0xffffff)
            .setFooter(`Do ${settings.prefix}colorme [color] to get a color. eg. ${settings.prefix}colorme ${roles.random().name.slice(2)}`);
        message.channel.send({ embed });
        return undefined;
    }

    const role = roles.find(`name`, `#!${args.join(` `)}`) || mRoles.first();

    if (!role) {
        const embed = new Discord.RichEmbed()
            .addField(`:no_entry_sign: | Error!`, `That doesn't seem to be a valid role! See all avaliable roles by doing ${settings.prefix}colorme (This command is case sensitive)`)
            .setColor(0xffffff);
        message.channel.send({ embed });
        return undefined;
    }

    try {
        await message.guild.member(message.author).addRole(role);
        const embed = new Discord.RichEmbed()
            .addField(`Success!`, `I have given you the color <@&${role.id}>`)
            .setColor(0xffffff);
        message.channel.send({ embed });
    } catch (err) {
        message.channel.send(`Something went very wrong | ${err}`);
        console.log(err.stack);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: `User`,
};

exports.help = {
    name: `colorme`,
    category: `Utility`,
    description: `Gives you an colored role!`,
    extendedDescription: `I will give you a colored role that you mention that starts with #! (eg. e!colorme Blue)`,
    usage: `colorme [color name]`,
};
