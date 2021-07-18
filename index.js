const Discord = require('discord.js');
require('dotenv').config();

const commandHandler = require('./commands');

const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
    console.log('Bot online.');
});

client.on('message', commandHandler);