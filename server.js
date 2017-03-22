var Bot = require('./bot.js')

var bot = new Bot(function(){
        	token: process.env.TOKEN,
            name: 'stat_bot'
        });

  bot.connect();