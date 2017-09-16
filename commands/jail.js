const Discord = require(`discord.js`);
const Jimp = require(`jimp`);

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const msg = await message.channel.send(`Generating...`);
    if (message.mentions.users.size < 1) {
        Jimp.read(message.author.avatarURL).then((photo) => {
            photo.resize(512, 512).grayscale();
            Jimp.read(`./img/jail.png`).then((lenna) => {
                photo.composite(lenna, 0, 0);
                photo.getBuffer(Jimp.MIME_PNG, (err, image) => {
                    msg.delete();
                    message.channel.send({ files: [{ attachment: image, name: `${message.author.tag}.png` }] });
                });
            });
        });
    } else if (message.mentions.users.size > 1) {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .addField(`Error!`, `Please mention a single user!`)
            .setColor(0xff5454));
    } else {
        const mention = message.guild.member(message.mentions.users.first());
        Jimp.read(mention.user.avatarURL).then((photo) => {
            photo.resize(512, 512).grayscale();
            Jimp.read(`./img/jail.png`).then((lenna) => {
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
    aliases: [],
    permLevel: `User`,
};

exports.help = {
    name: `jail`,
    category: `Image`,
    description: `Put someone behind bars!`,
    furtherDescription: `I put the mentioned person behind bars! If there is no mention I put you behind bars! >:D`,
    usage: `jail [@user]`,
};
