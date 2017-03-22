var Bot = require('./bot.js')

var bot = new Bot({
        	token: process.env.TOKEN,
            name: 'stat_bot'
        });

    bot.connect();