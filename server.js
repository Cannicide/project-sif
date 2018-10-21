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
var memes = require('dankmemes');
var memelist = 0;
memes("month", 50, function(err, data) {
  memelist = data;
});


client.on('guildCreate', guild => {
    guild.channels.get(guild.channels.find("name", "general").id).send("Thanks for adding Project Sif to your guild! Use the command ?help to get started.");
});

client.on('ready', () => {
    console.log('Project Sif is up and running!');
    client.user.setActivity('?sifhelp', { type: 'PLAYING' });
});

client.on('message', message => {

  if (localStorage.getItem(message.author.id) > 0) {
}
else {
  localStorage.setItem(message.author.id, 0);
}
  if (localStorage.getItem(message.author.tag) > 1) {
}
else {
  localStorage.setItem(message.author.tag, 1);
}
  if (localStorage.getItem(message.guild)) {
    if (localStorage.getItem(message.guild).length > 1) {
        localStorage.setItem(message.guild, "?");
        message.channel.send("Reset guild's prefix to ? due to incompatible prefix.");
        }
      prefix = localStorage.getItem(message.guild);
      }

  var coins = Number(localStorage.getItem(message.author.id)) + (1/4 * Number(localStorage.getItem(message.author.tag)));
  localStorage.setItem(message.author.id, coins);

if (message.content.startsWith(prefix) || message.content.startsWith("?sifhelp")) {
        message.channel.startTyping();
        setTimeout(function() {
        if (message.content == prefix + "help" || message.content == "?sifhelp") {
            message.channel.send(`\`\`\` Commands\n\n${prefix}sif:core prefix [new prefix] - Changes bot prefix for your guild (Temporarily only works for Cannicide)\n${prefix}help - Help command\n?sifhelp - Alias for help command, works regardless of prefix\n${prefix}coins - Checks your dollar balance\n${prefix}meme - Random meme from Reddit\n${prefix}info - Gives info about the bot\n${prefix}roulette [bet] [color] - Plays roulette with a bet from your dollar balance and a color of either red, green, or black\n${prefix}multiplier [add/view] - Buys or views current dollar multiplier, which multiplies your dollars-per-message per each level of multiplier.\`\`\``);
        }
        if (message.content == prefix + "coins") {
            var cvalue = Math.round(localStorage.getItem(message.author.id));
          message.reply("you have **💵 " + cvalue + " Dollars!**");
        }
        else if (message.content.startsWith(prefix + "coins")) {
            var mmberinquestion = message.mentions.members.first().user.id;
            message.reply(message.mentions.members.first().user.username + " has **💵 " + Math.round(localStorage.getItem(mmberinquestion)) + " Dollars!**");
        }
        if (message.content.startsWith(prefix + "purge")) {
            var purgeamnt = Number(message.content.split(" ")[1]);
            var purgelimit = purgeamnt + 1;
            message.channel.fetchMessages({ limit: purgelimit }).then(messages => {
              message.channel.bulkDelete(messages);
            });
            message.reply("deleted " + purgeamnt + " messages, including deletion command!");
        }
        if (message.content.startsWith(prefix + "sif:core prefix ") && message.author.tag == "Cannicide#2753") {
          localStorage.setItem(message.guild, message.content.split(" ")[2]);
          message.reply("Set the prefix for this guild (" + message.guild + ") to " + message.content.split(" ")[2]);
        }
        if (message.content == prefix + "meme") {
          if (message.channel.nsfw && (Number(localStorage.getItem(message.author.id)) > 5 || Number(localStorage.getItem(message.author.id)) == 5)) {
          var rndnumb = Math.floor(Math.random() * 51);
          var dankmemer = memelist[rndnumb].replace("&amp;", "&");
          message.channel.send(dankmemer).then(() => {
            localStorage.setItem(message.author.id, (Number(localStorage.getItem(message.author.id)) - 5));
          });
          }
          else if (Number(localStorage.getItem(message.author.id)) < 5) {
          message.reply("each meme costs 5 dollars... check your dollar balance with: " + prefix + "coins");
          }
          else {
          message.reply("the meme command retrieves memes from Reddit, which may contain NSFW ideas (but not NSFW images)... for that reason, you can only use this command in an NSFW channel.");
          }
        }
        if (message.content == prefix + "info") {
           message.channel.send("`Info on Project Sif`\n\nAt least one to two commands are added to this bot per week.\nProject Sif was created by Cannicide#2753.\nIt is built and run on a server, so the bot will never go offline unless the server itself does.\nTo report bugs, DM Cannicide or submit an issue on Github.\nFor a commands list, do " + prefix + "help");
        }
        if (message.content == prefix + "roulette") {
            message.channel.send("`How to Use Roulette`\n\nUsage: `" + prefix + "roulette <bet> <color>`\nExample: `" + prefix + "roulette 25 green`\nDescription: A game with a big wheel, in which a ball is rolled. The wheel contains many pockets, each one colored Green, Black, or Red. Your job is to guess the color on which the ball will stop rolling. Guessing black or red correctly gives you double what you bet, and guessing green correctly gives you 100 times what you bet. Bets use your dollar balance, which can be checked with `" + prefix + "coins`");
        }
        else if (message.content.startsWith(prefix + "roulette")) {
            var bet = message.content.split(" ")[1];
            var color = message.content.split(" ")[2];
            if (!bet || !color || (color.toUpperCase() != "GREEN" && color.toUpperCase() != "BLACK" && color.toUpperCase() != "RED") || Number(bet) > localStorage.getItem(message.author.id)) {
                message.reply("please specify a valid bet and valid color.");
            }
            else {
              var truecolornum = Math.floor(Math.random() * 40);
              var truecolorarray = ["GREEN", "BLACK", "RED"];
              var truecolor;
              if (truecolornum > 0 && truecolornum < 10) {
                  truecolor = truecolorarray[0];
              }
              else if (truecolornum > 9 && truecolornum < 22) {
                  truecolor = truecolorarray[1];
              }
              else if (truecolornum > 1 && truecolornum > 21) {
                  truecolor = truecolorarray[2];
              }
              if (truecolor == color.toUpperCase()) {
                  var vicresponse = "congratulations! You guessed correctly and gained **" + bet + " Dollars**!";
                  if (truecolor == "GREEN") {
                      var origbet = bet;
                      bet = bet * 12;
                      vicresponse = "what a lucky day! You guessed correctly and gained **" + (Number(origbet) * 12) + " Dollars**!";
                  }
                  localStorage.setItem(message.author.id, (Number(localStorage.getItem(message.author.id)) + Number(bet)));
                  message.reply(vicresponse);
              }
              else {
                  localStorage.setItem(message.author.id, (Number(localStorage.getItem(message.author.id)) - Number(bet)));
                  message.reply("rip... You guessed " + color.toUpperCase() + ", but the color was " + truecolor + ". You lost some dollars.");
              }
            }
        }
        if (message.content == prefix + "multiplier") {
          message.channel.send("`How to Use Multiplier`\n\nUsage: `" + prefix + "multiplier <add/view>`\nExample: `" + prefix + "multiplier add`\nDescription: Buy a multiplier to earn more dollars per message (add), or view your current multiplier (view). Each multiplier costs 1000 times the current multiplier level. Default multiplier level is 1. Each purchase now doubles your multiplier, for faster grinding.");
        }
        else if (message.content == prefix + "multiplier view") {
          message.channel.send(`Current multiplier: x${localStorage.getItem(message.author.tag)}`);
        }
        else if (message.content.startsWith(prefix + "multiplier")) {
          if (localStorage.getItem(message.author.id) >= (1000 * Number(localStorage.getItem(message.author.tag)))) {
            localStorage.setItem(message.author.tag, (Number(localStorage.getItem(message.author.tag)) * 2));
            localStorage.setItem(message.author.id, (Number(localStorage.getItem(message.author.id)) - (1000 * Number(localStorage.getItem(message.author.tag)))));
            message.reply("Purchase successful! You now have a multiplier of x" + localStorage.getItem(message.author.tag) + " dollars!");
          }
          else {
            message.reply("you do not have enough dollars to do that. Amount required: " + (1000 * Number(localStorage.getItem(message.author.tag))) + ".");
          }
        }

        //this portion was/is made by the nug
        if (message.content == prefix + "chess help") {
          message.channel.send("Use ?chess <@someone> to challenge someone to a game");
          message.channel.send("The board is laid out in coordinates. It goes ``` |A|B|C|D|E|F|G|H\n1\n2\n3\n4\n5\n6\n7\n8");
        }
        if (message.content.startsWith(prefix + "coins")) {
          var challenged = message.mentions.members.first().user.id;
          var challenger = message.author.user.id;
          message.channel.send(mmberinquestion + "has been challeneged by" + message.author.user.id + "to a game of chess, ***TO THE DEATH***");
          message.channel.send("Here is your board: ``` \n R|K|B|Q|K|B|K|R\n---------------\nP|P|P|P|P|P|P|P\n---------------\n | | | | | | |\n---------------\n | | | | | | |\n---------------\n | | | | | | |\n---------------\n | | | | | | |\n---------------\nP|P|P|P|P|P|P|P\n---------------\nR|K|B|Q|K|B|K|R");
          message.channel.send("May the challenged party pick heads or tails")
          if (message.content == ("heads") && (Math.floor(Math.random() * 2)==1)) {
            message.channel.send("The Challenged party gets the white side")
            message.channel.send("You may start playing");
            if () {
            }
          }
          if (message.content == ("tails") && (Math.floor(Math.random() * 2)==0)) {
            message.channel.send("The Challenged party gets the white side")
            message.channel.send("You may start playing");
            if () {
            }
          }
        }
        if (message.content.startsWith(prefix + "senpai")) {.
          
          message.channel.sendFile("senpei.png");
        }
        //nug section has ended, mepis bepis alfredo fetticine lettuce

        message.channel.stopTyping();
        }, 1000);
    }
});



client.login(process.env.TOKEN);
