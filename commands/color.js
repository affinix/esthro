const Discord = require(`discord.js`);
const Canvas = require(`canvas`);

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    let color = args[0];
    const canvas = new Canvas();
    const ctx = canvas.getContext(`2d`);
    const settings = message.guild
        ? client.settings.get(message.guild.id)
        : client.config.defaultSettings;

    canvas.width = 200;
    canvas.height = 200;

    if (!color) {
        const embed = new Discord.RichEmbed()
            .addField(`:no_entry_sign: | Syntax Error!`, `Please give me a color! \`${settings.prefix}color [#color]\``)
            .setColor(0xffffff);
        message.channel.send({ embed });
        return undefined;
    }

    if (color.startsWith(`#`)) {
        color = color.slice(1);
    }

    const generate = () => {
        ctx.fillStyle = `#${color}`;
        ctx.fillRect(0, 0, 200, 200);
    };
    generate();

    message.channel.send({
        files: [{
            attachment: canvas.toBuffer(),
            name: `${color}.png`,
        }],
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [`colour`],
    permLevel: `User`,
};

exports.help = {
    name: `color`,
    category: `Image`,
    description: `Outputs image of color`,
    extendedDescription: `Input an color and I'll output an image with it!`,
    usage: `color [#color]`,
};
