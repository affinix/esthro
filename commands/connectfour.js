const Discord = require(`discord.js`);

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const settings = message.guild
        ? client.settings.get(message.guild.id)
        : client.config.defaultSettings;

    switch (args[0].toLowerCase()) {
    case `start`:
        if (!message.mentions.users.first()) {
            const embed = new Discord.RichEmbed()
                .addField(`:no_entry_sign: | Error!`, `Please mention someone!`)
                .setColor(0xffffff);
            message.channel.send({ embed });
            return undefined;
        }
        client.conn4.set(client.conn4.get(`id`) + 1, {
            p1: `${message.author.id}`,
            p2: `${message.mentions.users.first().id}`,
            moves: 0,
            turn: 1,
            board: [
                [`0`, `0`, `0`, `0`, `0`, `0`, `0`],
                [`0`, `0`, `0`, `0`, `0`, `0`, `0`],
                [`0`, `0`, `0`, `0`, `0`, `0`, `0`],
                [`0`, `0`, `0`, `0`, `0`, `0`, `0`],
                [`0`, `0`, `0`, `0`, `0`, `0`, `0`],
                [`0`, `0`, `0`, `0`, `0`, `0`, `0`],
                [`0`, `0`, `0`, `0`, `0`, `0`, `0`],
            ],
        });
        client.conn4M.set(message.author.id, client.conn4.get(`id`) + 1);
        client.conn4M.set(message.mentions.users.first().id, client.conn4.get(`id`) + 1);

        let embed = new Discord.RichEmbed()
            .addField(`Success`, `I have created a game between you and <@!${message.mentions.users.first().id}>`)
            .setColor(0xffffff);
        message.channel.send({ embed });

        embed = new Discord.RichEmbed()
            .addField(`Game:`, `${displayBoard(client.conn4.get(client.conn4M.get(message.author.id)).board)}`)
            .setColor(0xffffff)
            .setFooter(`Player 1, Make your move! ${settings.prefix}connectfour play [column] | Game ID: ${client.conn4.get(`id`)}`);

        message.channel.send({ embed });
        break;

    case `play`:
        const id = client.conn4M.get(message.author.id);
        if (!id) {
            const embed = new Discord.RichEmbed()
                .addField(`:no_entry_sign: | Error!`, `It seems as if you are not in a game. Do ${settings.prefix}connectfour start [@mention]`)
                .setColor(0xffffff);
            message.channel.send({ embed });
            return undefined;
        }
        const p1 = client.conn4.get(id).p1;
        const p2 = client.conn4.get(id).p2;
        const c = args.slice(1)[0];
        const board = client.conn4.get(id).board;
        const turn = client.conn4.get(id).turn;

        if (!c) {
            const embed = new Discord.RichEmbed()
                .addField(`:no_entry_sign: | Error!`, `Please provide a column to place your counter in!`)
                .setColor(0xffffff);
            message.channel.send({ embed });
            return undefined;
        }

        break;
    default:
        break;
    }

    function displayBoard(board) {
        if (typeof board !== `object`) throw new Error(`Input must be an array`);
        let out;
        for (const i in board) {
            for (const x in board[i]) {
                out += board[i][x] == 0 ? `⚪  ` : board[i][x] == 1 ? `🔴  ` : `⭕  `; 
            }
            out += `\n`;
        }
        if (!out || out === ``) throw new Error(`Invalid Board`);
        out += `1  2  3  4  5  6  7`;
        return out.split(`undefined`)[1];
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: `User`,
};

exports.help = {
    name: `connectfour`,
    category: `Games`,
    description: `Play connect four in discord!`,
    extendedDescription: `\`\`\`e!connectfour start [@mention]\ne!connectfour play [column]\ne!connectfour end\`\`\``,
    usage: `connectfour [start/play/end] [@mention/column]`,
};
