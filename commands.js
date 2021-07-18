require('dotenv').config();

// Load commands from commands folder
// i.e. ./commands/doSomething.js will create a !doSomething command
let commands = {};
require('fs').readdirSync('./commands/').forEach((file) => {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
        var command = file.replace('.js', '');
        commands[command] = require(`./commands/${file}`);
    }
});

module.exports = function (msg) {
    if (msg.channel.id == process.env.BOT_CONTROL_CHANNEL_ID && 
        msg.author.id == process.env.ADMIN_USER_ID &&
        msg.content[0] == '!') {
            let args = msg.content.split(' ');
            let command = args.shift();

            if (command != '!') {
                command = command.substr(1);

                if(commands[command]) {
                    commands[command](msg, args);
                }
            }
        }
}