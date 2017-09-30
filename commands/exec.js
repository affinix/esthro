const { exec } = require("child_process");

exports.run = (client, message, args) => {
   if (args.length < 1) {
     return message.channel.send("You must add a argument! :(");
   } else {
      exec(args.join(" "), (err, stderr, stdout) => {
         if (err) {
            return message.channel.send(`An error has occured while processing: \`\`\`sh\n${stderr}\`\`\`);
         } else {
           message.channel.send(`:white_check_mark: \`\`\`sh\n${stdout}\`\`\``);
         }
      });
   }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['bash', 'sh'],
    permLevel: "Bot Owner",
};

exports.help = {
    name: `exec`,
    category: `System`,
    description: `This command is paramter to the owner only! | This will execute from the VPS System or Terminal.`
    extendedDescription: `\`\`\`e!exec [bash | sh code]\`\`\``,
    usage: `exec [code]`,
};
