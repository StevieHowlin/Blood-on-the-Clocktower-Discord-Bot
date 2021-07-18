require('dotenv').config();

module.exports = async (msg, args) => {
    // USAGE: !villagers
    // DESCRIPTION: 1) Removes 'villager' role from all users on the server. 
    //              2) Adds 'villager' role to all user in Town Square voice channel
    
    // Find villager role
    const villagerRole = msg.guild.roles.cache.find(r => r.name == 'villager');
    
    // Find all existing villagers
    const existingVillagers = villagerRole.members;

    // Remove the villager role
    existingVillagers.each(villager => villager.roles.remove(villagerRole));

    // Find Town Square voice channel
    const townSquare = msg.guild.channels.cache.find(c => c.id == process.env.TOWNSQUARE_CHANNEL_ID);

    // Find all users in Town Square
    const potentialVillagers = townSquare.members;

    // Give everyone in the Town Square who isn't the storyteller the villager role 
    potentialVillagers.each((villager) => {
        if (!villager.roles.cache.find(r => r.name == 'storyteller')) {
            villager.roles.add(villagerRole);
        }
    });
}