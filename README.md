# Weatherbot
Interactive SlackBot for weather info!
His name is WeatherWiz9000!!

## Descrption
This weatherbot reports the weather condition for a given location.

## Usage
Two ways to interact with the bot:
1) go to 'https://yiweatherbot.herokuapp.com' and send the commands
2) send commands directly through slack channel

Get reports by typing in city names, zip codes, latitude and lontidude.

## Examples
Note: (Message has to be directed at the weatherbot,
Use '@WeatherWiz9000 ' at the begining of messages.)

If I want to know the weather in San Mateo, USA, I could do the following commands:<br />
@WeatherWiz9000 San Mateo<br />
@WeatherWiz9000 San Mateo,USA<br />
@WeatherWiz9000 zip=94402<br />
@WeatherWiz9000 lat=37&lon=122<br />

user can also type in "@WeatherWiz9000 help" for commands help.

## Project Structure

### Description
Weatherbot is created as a bot user in Slack, it will only post messages to GENERAL Chat.
Bot status icon will be green if its online.

This project is built using the following open-source libraries:
Express: used to create the service and listen to ports
Axios: used to make POST or GET request to the slack webhook, open weather api
Slackbots: used to invoke bot interactives and post messages to the chat

For additional code breakdown go inside index.js for more details.

## Additional Notes
This slackbot is deployed on Heroku, a cloud hosting service.
The Drawback is that since its free tier service, the hosted app will become idle after 30 mins of inactivity.
To wake up the bot, go to 'https://yiweatherbot.herokuapp.com' and the bot will become active again in slack.
It takes about 10-15 secs for Heroku to start up the service. :( <br />
Once the bot is active, user can use either methods to send commands.

### File Overview
**index.html**: html file containing simple input box to send message to slack 'general' chat.<br />
**index.js**: main file used for starting up service bot, message handling and connecting to openweather api.<br />
**app.json**: json file require for Heroku cloud service.<br />
**package.json**: contains all the resource used: express, slackbots and axios.<br />
**Procfile**: a trigger file require for Heroku, for start command.<br />
**README.md**: description/instruction for weatherbot<br />

### Personal Note
This was an interesting project, I havent had a lot experience with Slack, they sure have some cool stuff in there.
The most diffcult part for me was surprisingly trying to find a good and free cloud hosting service. Heroku wasnt too bad
but it has its pros and cons. I ran into problems at first after first deploy on Heroku, problems such as Im required to assign a port
to within the first 60secs. Then I found out it would stop the service after 30min of inactivty, but one can "wake" the service
by going to your hosted app site on heroku.
