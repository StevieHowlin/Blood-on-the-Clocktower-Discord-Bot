require('dotenv').config();

module.exports = async (msg, args) => {
    // USAGE: !day
    // DESCRIPTION: Moves all villagers to Town Square voice channel

    // Get Town Square voice channel
    const townSquare = msg.guild.channels.cache.find(c => c.id == process.env.TOWNSQUARE_CHANNEL_ID);

    // Find villager role
    const villagerRole = msg.guild.roles.cache.find(r => r.name == 'villager');
    
    // Find all existing villagers
    const villagers = villagerRole.members;

    // Move each villager to town square
    villagers.each(villager => villager.voice.setChannel(townSquare, 'Rise and shine!'));
}