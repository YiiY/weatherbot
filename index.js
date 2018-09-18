const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({

	token:'xoxb-437256997315-437544290789-d7zX8LpjQeV0Np694vsHcufB',
	name:'WeatherWiz9000'

});

//Start handler
bot.on('start',()=>{
	const params ={
		icon_emoji: ':smiley:'
	}
 bot.postMessageToChannel('general','Get Ready',params);


})
