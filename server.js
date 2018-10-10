  // server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./ls.txt');
}
 

const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = "?";



client.on('guildCreate', guild => {
    guild.channels.get(guild.channels.find("name", "general").id).send("Thanks for adding Project Sif to your guild! Use the command ?help to get started.");
});

client.on('ready', () => {
    console.log('Project Sif is up and running!');
    client.user.setActivity('?help', { type: 'PLAYING' });
});

client.on('message', message => {
  
  if (localStorage.getItem(message.author.id) > 0) {
}
else {
  localStorage.setItem(message.author.id, 0); 
}
 
  var coins = Number(localStorage.getItem(message.author.id)) + 1/4;
  localStorage.setItem(message.author.id, coins);
  
if (message.content.startsWith(prefix)) {
        if (message.content == prefix + "help") {
            message.reply("");
        }
        if (message.content == prefix + "coins") {
            var cvalue = Math.round(localStorage.getItem(message.author.id));
          message.reply("you have **💵 " + cvalue + " Dollars!**");
        }
        else if (message.content.startsWith(prefix + "coins")) {
            var mmberinquestion = message.mentions.members.first().user.id;
            message.reply(message.mentions.members.first().user.username + " has **💵 " + Math.round(localStorage.getItem(mmberinquestion)) + " Dollars!**");
        }
        if (message.content == prefix + "") {
            
        }
    }
});



client.login(process.env.TOKEN);  