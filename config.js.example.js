module.exports = {
    ownerID: `Your ID goes here`,
    token: `Bot token goes here`,
    defaultSettings: {
        prefix: `e!`,
        modLogChannel: `mod-log`,
        modRole: `Moderator`,
        adminRole: `Administrator`,
        welcomeMessage: `Please welcome {{user}} to {{guild}}, everyone!`,
        welcomeEnabled: `false`,
        welcomeChannel: `bots`,
        announcementChannel: `announcements`,
        starsEnabled: `false`,
        starChannel: `starboard`,
    },
    permLevels: [
        {
            level: 0,
            name: `User`,
            check: () => true,
        },

        {
            level: 2,
            name: `Moderator`,
            check: (message) => {
                try {
                    const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
                    if (modRole && message.member.roles.has(modRole.id)) return true;
                } catch (e) {
                    return false;
                }
            },
        },

        {
            level: 3,
            name: `Administrator`,
            check: (message) => {
                try {
                    const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
                    return (adminRole && message.member.roles.has(adminRole.id));
                } catch (e) {
                    return false;
                }
            },
        },

        {
            level: 4,
            name: `Server Owner`,
            check: message => message.guild.owner.user.id === message.author.id,
        },

        {
            level: 10,
            name: `Bot Owner`,
            check: message => message.client.config.ownerID === message.author.id,
        },
    ],
};
