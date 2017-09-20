if (process.version.slice(1).split(`.`)[0] < 8) throw new Error(`Node 8.0.0 or higher is required. Update Node on your system.`);

const Discord = require(`discord.js`);
const { promisify } = require(`util`);
const readdir = promisify(require(`fs`).readdir);
const Enmap = require(`enmap`);

const client = new Discord.Client();

client.config = require(`./config.js`)

require(`./util/functions.js`)(client);

client.commands = new Enmap();
client.aliases = new Enmap();
client.conn4 = new Map();
client.conn4.set('id', 0)
client.conn4M = new Map();

client.settings = new Enmap({ name: `settings`, persistent: true });
client.esthros = new Enmap({ name: `esthros`, persistent: true });
client.tags = new Enmap({ name: `tags`, persistent: true });


const init = async () => {
    const cmdFiles = await readdir(`./commands/`);
    client.log(`log`, `Loading a total of ${cmdFiles.length} commands.`);
    cmdFiles.forEach((f) => {
        try {
            const props = require(`./commands/${f}`);
            if (f.split(`.`).slice(-1)[0] !== `js`) return;
            client.log(`cmd`, `Loading Command: ${props.help.name}`);
            client.commands.set(props.help.name, props);
            props.conf.aliases.forEach((alias) => {
                client.aliases.set(alias, props.help.name);
            });
        } catch (e) {
            client.log(`Unable to load command ${f}: ${e.stack}`);
        }
    });

    const evtFiles = await readdir(`./events/`);
    client.log(`event`, `Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach((file) => {
        const eventName = file.split(`.`)[0];
        const event = require(`./events/${file}`);

        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });


    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i += 1) {
        const thisLevel = client.config.permLevels[i];
        client.levelCache[thisLevel.name] = thisLevel.level;
    }

    client.login(client.config.token);
};

init();
