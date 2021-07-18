require('dotenv').config();

module.exports = async (msg, args) => {
    // USAGE: !night
    // DESCRIPTION: Moves all villagers in Town Square to individual cottages

    // Find all empty cottages
    const cottages = msg.guild.channels.cache.filter(c => c.name == 'Cottage' && c.members.size == 0).map(c => c);

    // Find all villagers in the Town Square
    const villagers = msg.guild.channels.cache.find(c => c.id == process.env.TOWNSQUARE_CHANNEL_ID).members.filter(m => m.roles.cache.filter(r => r.name == 'villager').size > 0).map(v => v);

    // Move each villager into their own cottage
    if (villagers.length > cottages.length) {
        console.log('Too many villagers, not enough cottages.')
    } else {
        for (let i = 0; i < villagers.length; i++) {
            villagers[i].voice.setChannel(cottages[i], 'Goodnight!')
        }
    }
}