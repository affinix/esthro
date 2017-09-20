module.exports = (client, guild) => {
    client.settings.delete(guild.id);
    client.tags.delete(guild.id, {});
};
