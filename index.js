const SlackBot = require('slackbots');
const axios = require('axios');
const express = require('express');
const app = express();
const path =require('path');

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname + '/index.html'));

const bot = new SlackBot({//initiate the slack bot, request bot using token and name

	token:'xoxb-437256997315-437544290789-d7zX8LpjQeV0Np694vsHcufB',
	name:'WeatherWiz9000'

});

//Start handler
//Post a msg to general chat when bot is live
bot.on('start',()=>{
	
 	bot.postMessageToChannel(
 	'general',
 	'Hello there, this is weatherWiz9000, Im ready for my first test. Please enter a location to check its weather.'

 );
})

//Error Handler
bot.on('error', err => console.log(err));

//Message Handler
//only process the text if the message is directed at the bot.
bot.on('message',data => {
	//comment this if statement out will cause every message in the channel to be sent as a request
	if(data.username !== 'WeatherWiz9000' && data.type == 'message'){
		messageHandler(data.text);
		
	}
	else 
		return;

});

//branch for 2 type of commands: 1)help 2)weather commands
function messageHandler(message){
		if(message.includes('help'))
			getHelp();
		//weather commands requires user to start the input with "@{botid}"
		//meaning the msg has to be address to the weather bot
		else if(message.includes('@UCVG08JP7')){
			getWeather(message.replace('<@UCVG08JP7> ',''));
		}
		else if(message.includes("@WeatherWiz9000 ")){
			getWeather(message.replace('@WeatherWiz9000 ',''));
		}
	
}

//use regualr expression to detent speical character to correctly piece together the request url
function getWeather(message){
	const regex = /[=&]/;
	var optr='q=';
	if(regex.test(message)){//for special inputs like "id={}", "lat={}&lon={}"
		optr='';
		
	}
	
	axios.get('http://api.openweathermap.org/data/2.5/weather?'+ optr +message.replace('amp;','')+'&APPID=3108b6e814e9396d7f54573e06dd1959')
	.then(function (response) {
		
		//gets the weather description and temperture from the input 
		const des = response.data['weather'][0].description;
		const temp = response.data['main'].temp;
		
			bot.postMessageToChannel(
 			'general',
 			'Weather at ' + message + " is " + des + " with a temperture of " + temp + "K."
 		);
		
	})
	.catch(function(error){
		//if request to openweather api failed
		bot.postMessageToChannel(
 			'general',
 			'Im sorry, Im afraid I cant do that.'
 		);

	});

}

//simple msg to help user understand commands
function getHelp(){
	bot.postMessageToChannel(
 			'general',
 			'You can enter by city,zipcode,country or corrdinates.\nExamples: San Mateo, 94402 or USA'
 		);
}

});

//listen to default port 5000 for local testing 
//"process.env.PORT" is for HEROKU since their free tier hosting requires binding to a port within 60sec of launching app
app.listen(process.env.PORT || 5000);
