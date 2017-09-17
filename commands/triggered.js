const Discord = require(`discord.js`);
const Jimp = require(`jimp`);

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    if (message.mentions.users.size < 1) {
        Jimp.read(message.author.avatarURL).then((photo) => {
            photo.resize(512, 512);
            Jimp.read(`./img/trigger.png`).then((lenna) => {
                photo.composite(lenna, 0, 0);
                photo.getBuffer(Jimp.MIME_PNG, (err, image) => {
                    message.channel.send({ files: [{ attachment: image, name: `${message.author.tag}.png` }] });
                });
            });
        });
    } else if (message.mentions.users.size > 1) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField(`:no_entry_sign: | Error!`, `Please mention a single user!`)
            .setColor(0xff5454));
    } else {
        const mention = message.guild.member(message.mentions.users.first());
        Jimp.read(mention.user.avatarURL).then((photo) => {
            photo.resize(512, 512);
            Jimp.read(`./img/trigger.png`).then((lenna) => {
                photo.composite(lenna, 0, 0);
                photo.getBuffer(Jimp.MIME_PNG, (err, image) => {
                    message.channel.send({ files: [{ attachment: image, name: `${mention.user.tag}.png` }] });
                });
            });
        });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [`trigger`],
    permLevel: `User`,
};

exports.help = {
    name: `triggered`,
    category: `Image`,
    description: `Trigger someone!`,
    furtherDescription: `I trigger-memify someone's avatar! If no mention is provided, I'll trigger-memify you!`,
    usage: `triggered [@user]`,
};
