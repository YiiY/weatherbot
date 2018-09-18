const SlackBot = require('slackbots');
const axios = require('axios');
const express = require('express');
const app = express();

app.get('/',function(req,res){
	res.send('hell world');
	


const bot = new SlackBot({

	token:'xoxb-437256997315-437544290789-d7zX8LpjQeV0Np694vsHcufB',
	name:'WeatherWiz9000'

});

//Start handler
bot.on('start',()=>{
	
 	bot.postMessageToChannel(
 	'general',
 	'Hello there, this is weatherWiz9000, Im ready for my first test. Please enter a location to check its weather.'

 );
})

//Error Handler
bot.on('error', err => console.log(err));

//Message Handler
bot.on('message',data => {

	if(data.username !== 'WeatherWiz9000' && data.type == 'message'){
		messageHandler(data.text);
		
	}
	else 
		return;

});

function messageHandler(message){
		
		if(message.includes('help'))
			getHelp();

		else if(message.includes('@UCVG08JP7')){
				const str = message.replace('<@UCVG08JP7> ','')
				getWeather(str);

		}
	
}

function getWeather(message){
	axios.get('http://api.openweathermap.org/data/2.5/weather?q='+message+'&APPID=3108b6e814e9396d7f54573e06dd1959')
	.then(function (response) {
		
		const des = response.data['weather'][0].description;
		const temp = response.data['main'].temp;
		
			bot.postMessageToChannel(
 			'general',
 			'Weather at ' + message + " is " + des + " with a temperture of " + temp + "K."
 		);
		
	})
	.catch(function(error){
		
		bot.postMessageToChannel(
 			'general',
 			'Im sorry, Im afraid I cant do that.'
 		);

	});

}

function getHelp(){
	bot.postMessageToChannel(
 			'general',
 			'You can enter by city,zipcode,country or corrdinates.\nExamples: San Mateo, 94402 or USA'
 		);
}

});

app.listen(5000);