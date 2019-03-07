// server.js
// where the node app starts

// init project
var express = require('express');
var app = express();

app.use(express.static('public'));
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./ls.txt');
  var ls = require("./sif-casino/ls"); //ls file from Sif Casino module
}
 
//Discord.js initialized
const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = "?";
var memes = require('dankmemes');
var memelist = 0;
memes("week", 100, function(err, data) {
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
  try {

    //Guild ranking points:
    var points = 0;
    var memberindex = 0;
    var ismember = false;
    if (ls.exist("guildpoints")) {
      //Guild ranking system already set up
      ls.getObj("guildpoints").forEach(function(item, index) {
        if (item[0] == message.author.id) {
          ismember = true;
          memberindex = index;
        }
      });
      if (ismember) {
        //Member already has a guild rank
        var guildpoints = ls.getObj("guildpoints");
        guildpoints[memberindex][1] += 1;
        points = guildpoints[memberindex][1];
        ls.setObj("guildpoints", guildpoints);
      }
      else {
        //Member does not already have a guild rank
        var guildpoints = ls.getObj("guildpoints");
        guildpoints.push([message.author.id, 0]);
        points = 0;
        ls.setObj("guildpoints", guildpoints);
      }
    }
    else {
      //Guild rankng system not set up
      ls.setObj("guildpoints", []);
    }

    //Guild prefix:
    if (ls.exist(message.guild.id + "prefix")) {
      if (ls.get(message.guild.id + "prefix").length > 1) {
        ls.set(message.guild.id + "prefix", "?");
        message.channel.send("Reset guild's prefix to ? due to incompatible prefix.");
      }
      prefix = ls.get(message.guild.id + "prefix");
    }

    //Set message author's ID to convenient ID variable:
    var id = message.author.id;

    //Member multiplier amount:
    var multiplier = 1;
    if (!(ls.get(id + "mult") > 1) || !ls.exist(id + "mult")) {
      ls.set(id + "mult", 0);
    }
    multiplier = ls.get(id + "mult");

    //Member coin amount, adding 1/4 of multiplier:
    var coins = 0;
    if (!ls.exist(id + "coins") || !(ls.get(id + "coins") > 0)) {
      ls.set(id + "coins", 0);
    }
    coins = ls.get(id + "coins");
    coins += 1/4 * Number(ls.get(multiplier));

    //Member coins toplist for guild:
    if (ls.exist(message.guild.id + "coins")) {
      var toplist = ls.getObj(message.guild.id + "coins");
      var isOnToplist = false;
      toplist.forEach((mbToCoins, index) => {
        let memberId = mbToCoins[0];
        if (memberId == id) {
          isOnToplist = index;
        }
      });
      if (isOnToplist) {
        toplist[isOnToplist][1] == coins;
      }
      else {
        toplist.push([id, coins]);
      }
      ls.setObj(message.guild.id + "coins", toplist);
    }
    else {
      ls.setObj(message.guild.id + "coins", [[id, coins]]);
    }

    //Setup command, and args:
    var splitter = message.content.replace(" ", ";:splitter185151813367::");
    var splitted = splitter.split(";:splitter185151813367::");
    var fixRegExp = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var re = new RegExp(fixRegExp);
    var command = splitted[0].replace(re, "");
    if (splitted[1]) {
      var args = splitted[1].split(" ");
    }
    else {
      var args = false; 
    }

    //Avoid DM errors:
    if (message.guild === null) {
      if (message.author.id != "498956329428189204") {
        message.reply("Sorry " + message.author.username + ", DM messages are not supported by this bot.");
      }
      return false;
    }

    //Initialize commands module for help command, and all other command modules:
    var commands = require("./commands");
    commands.init(typeof commands);
    var tl = require("./toplist");
    commands.append(tl.details.name, tl.details.usage);

    //Prefix checker:
    if ((!splitted[0] || !splitted[0].match(prefix)) || (message.content != "?sifhelp")) {
      return false;
      //No prefix detected
    }
    else if (message.content == "?sifhelp") {
      command = "help";
    }

    //Command code itself:
    message.channel.startTyping();
    setTimeout(() => {
      
      switch (command) {
        case "sifhelp":
        case "sif":
        case "help":
            var list = commands.list(prefix);
            list.forEach((cmd, index) => {
              message.channel.send(cmd);
            });
          break;
        case "coins":
            var cvalue = Math.round(ls.get(id + "coins"));
            message.reply(`you have **💵 ${cvalue} Dollars!**`);
          break;
        case "toplist":
            var tlObj = ls.getObj(message.guild.id + "coins");
            message.channel.send(tl.coins(tlObj, id, message.guild.members));
          break;
      }

      message.channel.stopTyping();
    }, 1000);

  }
  catch(err) {
    message.channel.send(`Errors found:\n\`\`\`${err}\nAt ${err.stack}\`\`\``);
  }
});

  /*
  
 
  localstorage of message.author.id is COIN AMOUNT in old code
  localstorage of message.author.tag is GUILD POINTS/RANK in old code
  localstorage of message.guild is PREFIX in old code

  

        
        
        else if (message.content.startsWith(prefix + "coins")) {
            var mmberinquestion = message.mentions.members.first().user.id;
            message.reply(message.mentions.members.first().user.username + " has **💵 " + Math.round(localStorage.getItem(mmberinquestion)) + " Dollars!**");
        }
        if (message.content.startsWith(prefix + "purge") && message.member.hasPermission("ADMINISTRATOR")) {
            var purgeamnt = Number(message.content.split(" ")[1]);
            var purgelimit = purgeamnt + 1;
            message.channel.fetchMessages({ limit: purgelimit }).then(messages => {
              message.channel.bulkDelete(messages);
            });
            message.reply("deleted " + purgeamnt + " messages, including deletion command!");
        }
        if (message.content.startsWith(prefix + "sif:core prefix ") && (message.author.tag == "Cannicide#2753" || message.member.hasPermission("ADMINISTRATOR"))) {
          localStorage.setItem(message.guild, message.content.split(" ")[2]);
          message.reply("Set the prefix for this guild (" + message.guild + ") to " + message.content.split(" ")[2]);
        }
        if (message.content == prefix + "meme") {
          var memecost = 10 * Number(localStorage.getItem(message.author.tag));
          if ((Number(localStorage.getItem(message.author.id)) > memecost || Number(localStorage.getItem(message.author.id)) == memecost)) {
          var rndnumb = Math.floor(Math.random() * 51);
          var dankmemer = memelist[rndnumb].replace("&amp;", "&");
          message.channel.send(dankmemer).then(() => {
            localStorage.setItem(message.author.id, (Number(localStorage.getItem(message.author.id)) - Number(memecost)));
          });
          }
          else if (Number(localStorage.getItem(message.author.id)) < memecost) {
          message.reply("each meme costs " + memecost + " dollars... check your dollar balance with: " + prefix + "coins");
          }
          else {
          message.reply("the meme command retrieves memes from Reddit, which may contain NSFW ideas (but not NSFW images)... for that reason, you can only use this command in an NSFW channel."); 
          }
        }
        else if (message.content == prefix + "memeburst") {
          var memecost = 10 * Number(localStorage.getItem(message.author.tag));
          if ((Number(localStorage.getItem(message.author.id)) > memecost || Number(localStorage.getItem(message.author.id)) == memecost)) {
          var rndnumb = Math.floor(Math.random() * 51);
            var rndnumb2 = Math.floor(Math.random() * 51);
            var rndnumb3 = Math.floor(Math.random() * 51);
            var rndnumb4 = Math.floor(Math.random() * 51);
            var rndnumb5 = Math.floor(Math.random() * 51);
          var dankmemer = memelist[rndnumb].replace("&amp;", "&");
            var dankmemer2 = memelist[rndnumb2].replace("&amp;", "&");
            var dankmemer3 = memelist[rndnumb3].replace("&amp;", "&");
            var dankmemer4 = memelist[rndnumb4].replace("&amp;", "&");
            var dankmemer5 = memelist[rndnumb5].replace("&amp;", "&");
          message.channel.send("From https://reddit.com/r/dankmemes - Upvote them there!");
            message.channel.send(dankmemer).then(() => {
            localStorage.setItem(message.author.id, (Number(localStorage.getItem(message.author.id)) - Number(memecost)));
          });
            message.channel.send(dankmemer2).then(() => {
            localStorage.setItem(message.author.id, (Number(localStorage.getItem(message.author.id)) - Number(memecost)));
          });
            message.channel.send(dankmemer3).then(() => {
            localStorage.setItem(message.author.id, (Number(localStorage.getItem(message.author.id)) - Number(memecost)));
          });
            message.channel.send(dankmemer4).then(() => {
            localStorage.setItem(message.author.id, (Number(localStorage.getItem(message.author.id)) - Number(memecost)));
          });
            message.channel.send(dankmemer5).then(() => {
            localStorage.setItem(message.author.id, (Number(localStorage.getItem(message.author.id)) - Number(memecost)));
          });
          }
          else if (Number(localStorage.getItem(message.author.id)) < memecost) {
          message.reply("each meme costs " + memecost + " dollars... check your dollar balance with: " + prefix + "coins");
          }
          else {
          message.reply("the meme command retrieves memes from Reddit, which may contain NSFW ideas (but not NSFW images)... for that reason, you can only use this command in an NSFW channel."); 
          }
        }
        if (message.content == prefix + "info") {
           message.channel.send("`Info on Project Sif`\n\nAt least one to two commands are added to this bot per week.\nProject Sif was created by Cannicide#2753.\nIt is built and run on a server, so the bot will never go offline unless the server itself does.\nTo report bugs, DM Cannicide or submit an issue on Github.\nFor a commands list, do " + prefix + "help"); 
        }
        if (message.content == prefix + "roulette") {
            message.channel.send("`How to Use Roulette`\n\nUsage: `" + prefix + "roulette <bet> <color>`\nExample: `" + prefix + "roulette 25 green`\nDescription: A game with a big wheel, in which a ball is rolled. The wheel contains many pockets, each one colored Green, Black, or Red. Your job is to guess the color on which the ball will stop rolling. Guessing black or red correctly gives you double what you bet, and guessing green correctly gives you 12 times what you bet. Bets use your dollar balance, which can be checked with `" + prefix + "coins`");
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
              if (truecolornum > 0 && truecolornum <= 5) {
                  truecolor = truecolorarray[0];
              }
              else if (truecolornum > 5 && truecolornum <= 22) {
                  truecolor = truecolorarray[1];
              }
              else if (truecolornum > 22 && truecolornum <= 39) {
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
        if (message.content.startsWith(prefix + "points")) {
            var pointid = message.author.id;
            var intropoint = "you have ";
            var isitmem = false;
            if (message.content.split(" ").length > 1 && message.content.split(" ")[1].length == 18) {
              pointid = message.content.split(" ")[1];
              intropoint = `<@${pointid}>` + " has ";
            }
            localStorage.getItem("guildpoints").split(":sif:").forEach(function(item, index) {
              if (item.match(pointid)) {
                var score = Number(item.split(":score:")[1]);
                var guildrank = "Newbie";
                isitmem = true;
                if (score >= 25) {
                    guildrank = "Trainee";
                }
                if (score >= 100) {
                   guildrank = "Lame Memer"; 
                }
                if (score >= 500) {
                   guildrank = "Almighty Cheese"; 
                }
                if (score >= 800) {
                   guildrank = "Chicken Nugget"; 
                }
                if (score >= 900) {
                   guildrank = "5% Waluigi"; 
                }
                if (score >= 1000) {
                   guildrank = "Dank Memer"; 
                }
                if(score>=1100){
                   guildrank="Calcoholic I";
                   }
                if(score>=1200){
                   guildrank="Calcoholic II";
                   }
                if(score>=1300){
                   guildrank="Calcoholic III";
                   }
                if(score>=1400){
                   guildrank="Calcolator I";
                   }
                if(score>=1500){
                   guildrank="Calcolator II";
                   }
                if(score>=1600){
                   guildrank="Calcolator III";
                   }
                if(score>=1700){
                   guildrank="Mercury I";
                   }
                if(score>=1800){
                   guildrank="Mercury II";
                   }
                if(score>=1900){
                   guildrank="Mercury III";
                   }
                if(score>=2000){
                   guildrank="Mercury IV";
                   }
                if(score>=2100){
                   guildrank="Mercury V";
                   }
                if(score>=2200){
                   guildrank="Venus I";
                   }
                if(score>=2300){
                   guildrank="Venus II";
                   }
                if(score>=2400){
                   guildrank="Venus III";
                   }
                if (score >= 2500) {
                   guildrank = "Anime Addict"; 
                }
                if (score >= 5000) {
                   guildrank = "Dead Memer"; 
                }
                if (score >= 7500) {
                   guildrank = "Has No Life"; 
                }
                if (score >= 9000) {
                   guildrank = "Active User"; 
                }
                if (score >= 10000) {
                   guildrank = "Legendary Being"; 
                }
                if (score >= 25000) {
                   guildrank = "Literally Figurative"; 
                }
                if (score >= 50000) {
                   guildrank = "Spontaneous Memer"; 
                }
                if (score >= 100000) {
                   guildrank = "Time-Wasting No-Lifer"; 
                }
                if (score >= 500000) {
                   guildrank = "Nugtier Thing"; 
                }
                if (score >= 1000000) {
                   guildrank = "God"; 
                }
                if (score >= 5000000) {
                   guildrank = "Outright Spammer"; 
                }
                if (score >= 10000000) {
                   guildrank = "Depression-Level Active Discord User"; 
                }
                if (score >= 1000000000) {
                   guildrank = "Does Not Compute"; 
                }
                if (score >= 5000000000) {
                   guildrank = "Cannicidetier Thing"; 
                }
                if (score >= 1000000000000) {
                   guildrank = "Quadrillionaire"; 
                }
                if (score >= 1000000000000000) {
                   guildrank = "Delete Your Discord Right Now"; 
                }
                message.channel.send(intropoint + score + " guild points. Guild rank: " + guildrank + ".");    
              }
            });
          if (!isitmem) {
                message.channel.send(`<@${pointid}> has not sent any messages in a guild with me in it, and thus does not have any guild points 😦`);
              }
        }
        if (message.content.startsWith(prefix + "ls") && message.author.tag == "Cannicide#2753") {
          if (message.content.split(" ").length <= 2) message.reply(localStorage.getItem(message.content.split(" ")[1]));
          else {localStorage.setItem(message.content.split(" ")[1], message.content.split(" ")[2]); message.reply("Set " + message.content.split(" ")[1] + " to " + message.content.split(" ")[2]);}
        }
        if (message.content == prefix + "invite") {
            client.generateInvite(["ADMINISTRATOR"]).then(link => message.channel.send(`Generated bot invite link, click to invite to your server: ${link}`)).catch(error => message.channel.send(`Error 239: \`\`\`${error}\`\`\``));
        }
        if (message.content.startsWith(prefix + "hm help") || message.content == prefix + "hm") {
            message.channel.send("`How to Use Hangman`\n\nUsage: `" + prefix + "hm <start/guess> [{letter}]`\nExample: `" + prefix + "hm guess d`\nDescription: Starts a game of hangman (start), or guesses a letter in a started game (guess). Hangman, yay!");
        }
        else if (message.content == prefix + "hm start") {
            if (localStorage.getItem("\<hm)" + message.author.id)) {
                message.reply("you have already started a game of hangman! Type `" + prefix + "hm end` to end the game early.");
            }
            else {
                localStorage.setItem("\<hm)" + message.author.id, true);
                var words = ["Weather", "Incredibility", "Ponderous", "Fastidious", "Ominous", "Capricious", "Pervasive", "Aloof", "Disseminate", "Pugnacious", "Whimsical", "Unfathomable", "Predilection", "Insurgency", "Inadequate", "Immeasurable", "Terracotta", "Significance", "Immobility", "Versatility", "Carcinogen", "Death", "Hanged", "Eejit", "Magnanimous", "Pneumonoultramicroscopicsilicovolcanoconiosis", "Pneumonoultramicroscopicsilicovolcanoconiosis", "Pneumonoultramicroscopicsilicovolcanoconiosis", "Floccinaucinihilipilification", "Spectrophotofluorometrically", "Euouae", "Honorificabilitudinitatibus", "Ragamuffin", "Discombobulate", "Cat", "Ban"];
                var wordnum = Math.floor(Math.random() * words.length);
                var word = words[wordnum];
                var underscores = "";
                for (var i = 0; i < word.length; i++) {
                  underscores = underscores + "⬜ ";
                }
                localStorage.setItem("\<progress)" + message.author.id, underscores);
                localStorage.setItem("\<word)" + message.author.id, word);
                localStorage.setItem("\<guesses)" + message.author.id, 12);
                message.reply("you have begun a game of hangman! Use `" + prefix + "hm guess` to begin guessing!\n\n" + underscores);
            }
        }
        else if (message.content == prefix + "hm end") {
            if (localStorage.getItem("\<hm)" + message.author.id)) {
                localStorage.setItem("\<progress)" + message.author.id, "");
                localStorage.setItem("\<word)" + message.author.id, "");
                localStorage.setItem("\<hm)" + message.author.id, "");
                localStorage.setItem("\<guesses)" + message.author.id, 12);
                message.reply("ended game!");
            }
            else {
                message.reply("you do not have any running games to end.");  
            }
        }
        else if (message.content == prefix + "hm guess") {
            if (localStorage.getItem("\<hm)" + message.author.id)) {
                message.reply("guess a letter with `" + prefix + "hm guess [letter]`, as demonstrated in `" + prefix + "hm help`");
            }
            else {
                message.reply("you have not started a game of hangman yet... use `" + prefix + "hm start` to start a game!");  
            }
        }
        else if (message.content.startsWith(prefix + "hm guess ")) {
            if (localStorage.getItem("\<hm)" + message.author.id)) {
                var guess = message.content.split(" ")[2];
                var limit = localStorage.getItem("\<guesses)" + message.author.id);
                var word = localStorage.getItem("\<word)" + message.author.id);
                var underscores = [];
                var gotLetter = false;
                if (Number(limit) <= 1) {
                    message.reply("sorry, you are out of guesses. **Game over!**");
                    message.channel.send("The word was: **" + localStorage.getItem("\<word)" + message.author.id).split("").join(" ") + "**").then(m => {
                    localStorage.setItem("\<progress)" + message.author.id, "");
                    localStorage.setItem("\<word)" + message.author.id, "");
                    localStorage.setItem("\<hm)" + message.author.id, "");
                    localStorage.setItem("\<guesses)" + message.author.id, 12); });
                }
                else {
                for (var i = 0; i < word.length; i++) {
                  underscores.push("⬜");
                }
                for (var i = 0; i < word.length; i++) {
                    if (guess.toUpperCase() == word[i].toUpperCase()) {
                        gotLetter = true;
                        underscores[i] = word[i];
                        localStorage.setItem("\<progress)" + message.author.id, localStorage.getItem("\<progress)" + message.author.id) + word[i]);
                    }
                    else {
                     localStorage.getItem("\<progress)" + message.author.id).split("").forEach(function(item, index) {
                          if (item == word[i]) {
                              underscores[i] = item;
                          }
                        }); 
                    }
                }
                message.channel.send("**Hangman Progress**\n\n" + underscores.join(" "));
                if (gotLetter) {
                    if (underscores.indexOf("⬜") < 0) {
                        message.reply("you win! **+10000 dollars to you!**");
                        localStorage.setItem(localStorage.getItem(message.author.id), Number(localStorage.getItem(message.author.id)) + 10000);
                        localStorage.setItem("\<progress)" + message.author.id, "");
                        localStorage.setItem("\<word)" + message.author.id, "");
                        localStorage.setItem("\<hm)" + message.author.id, "");
                        localStorage.setItem("\<guesses)" + message.author.id, 12);
                    }
                }
                else {
                    limit = Number(limit) - 1
                    localStorage.setItem("\<guesses)" + message.author.id, limit);
                    message.reply("incorrect guess... " + limit + " guesses left.");
                }
                }
            }
            else {
                message.reply("you must start a game before guessing the word! Check out `" + prefix + "hm help`");  
            }
        }
          //Nugscript
          if (message.content.startsWith(prefix + "senpai")) {
          
          message.channel.send({files: [{
            attachment: "https://raw.githubusercontent.com/Cannicide/project-sif/master/senpei.PNG",
            name: "senpei.PNG"
          }]});
        }
        
    */

client.login("your token here");  