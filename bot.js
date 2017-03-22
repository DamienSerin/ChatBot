var SlackBot = require('slackbots');
var axios = require('axios');
module.exports = function(params) {
	this.bot = null;
	var self = this;
	this.connect = function(){
		self.bot = new SlackBot(params);
		self.bot.on('start', self.onStart);
		self.bot.on('message', self.onEvent);
	}

	self.onStart = function(){
		var params = {};


		self.bot.postMessageToChannel('general', 'Coucou', params);
		self.bot.postMessageToUser('statiyx', 'Its a secret message :o', params);

		self.bot.getUser(self.bot.name).then(function(user){
			self.user = user;
		});
	}

	self.onEvent = function(event) {
		var type = "[Unknown]";
		switch(event.type){
			case "message":
				switch(event.channel[0]){
					case 'D':
						type = "[PM]";
						break;
					case 'C':
						type = "[Channel]";
						break;
				}
				if(typeof event.bot_id !== 'undefined'){
					if(event.bot_id == self.user){break;}
					type+="[Bot]";
				} else {
					self.onHumanmsg(event);
				}
				console.log("%s %s: %s", type, event.username, event.text);
				break;
			default:
				console.log('-------------');
				console.log(event);
				console.log('-------------');
		}
	}

	self.onHumanmsg = function(data){
		self.bot.postMessage(data.channel, ":beer:");
	}

	setInterval(function(){
		var config = {
  			method: 'get',
  			url: '/user/12345',
		};

		axios.get('http://www.chucknorrisfacts.fr/api/get?data=tri:alea;nb:1').then(function(response){
			var json=response.data;
			self.bot.postMessageToChannel('general', json[0].fact, params);
			console.log(response.data);
			console.log(response.status);
		});


	},2000);
}