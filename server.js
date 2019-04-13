// server.js
// where the node app starts

// init project
var express = require('express');
var app = express();

app.use(express.static('public'));
app.get('/', function(request, response) {
  response.send('hello world');
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

//Invite
const invite = "https://discordapp.com/api/oauth2/authorize?client_id=498956329428189204&permissions=8&scope=bot";

var prefix = "?";
var memes = require('dankmemes');
var memelist = 0;
memes("week", 100, function(err, data) {
  memelist = data;
});


client.on('guildCreate', guild => {
    guild.channels.find("name", "general").send("Thanks for adding Project Sif to your guild! Use the command ?help to get started.");
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
    var guild = message.guild.id;
    if (ls.exist(guild + "guildpoints")) {
      //Guild ranking system already set up
      ls.getObj(guild + "guildpoints").forEach(function(item, index) {
        if (item[0] == message.author.id) {
          ismember = true;
          memberindex = index;
        }
      });
      if (ismember) {
        //Member already has a guild rank
        var guildpoints = ls.getObj(guild + "guildpoints");
        guildpoints[memberindex][1] += 1;
        points = guildpoints[memberindex][1];
        ls.setObj(guild + "guildpoints", guildpoints);
      }
      else {
        //Member does not already have a guild rank
        var guildpoints = ls.getObj(guild + "guildpoints");
        guildpoints.push([message.author.id, 0]);
        points = 0;
        ls.setObj(guild + "guildpoints", guildpoints);
      }
    }
    else {
      //Guild ranking system not set up
      ls.setObj(guild + "guildpoints", []);
    }

    //Guild prefix:
    if (ls.exist(message.guild.id + "prefix")) {
      if (ls.get(message.guild.id + "prefix").length > 1) {
        ls.set(message.guild.id + "prefix", "?");
        message.channel.send("Reset guild's prefix to ? due to incompatible prefix.");
      }
      prefix = ls.get(message.guild.id + "prefix");
    }
    else {
      ls.set(message.guild.id + "prefix", "?");
      prefix = "?";
    }

    //Set message author's ID to convenient ID variable:
    var id = message.author.id;

    //Member multiplier amount:
    var multiplier = 1;
    if (!(ls.get(id + "mult") > 1) || !ls.exist(id + "mult")) {
      ls.set(id + "mult", 1);
    }
    multiplier = ls.get(id + "mult");

    //Member coin amount, adding 1/4 of multiplier:
    var coins = 0;
    if (!ls.exist(id + "coins") || !(ls.get(id + "coins") > 0)) {
      ls.set(id + "coins", 0);
    }
    coins = ls.get(id + "coins");
    coins += 1/4 * Number(multiplier);
    ls.set(id + "coins", coins);

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
        toplist[isOnToplist][1] = coins;
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


    //Prefix checker:
    if ((!splitted[0] || !splitted[0].startsWith(prefix) || message.content.length <= 2) && (message.content != "?sifhelp")) {
      return false;
      //No prefix detected
    }
    else if (message.content == "?sifhelp") {
      command = "help";
    }

    //Permission checker:
    const isAdmin = message.member.hasPermission("ADMINISTRATOR");

    //Command code itself:
    message.channel.startTyping();
    setTimeout(() => {
      
      //Initialize commands module for help command, and all other command modules:
      var commands = require("./commands");
      commands.init(typeof commands);
      var tl = require("./toplist");
      commands.append(tl.details.name, tl.details.usage, tl.details.desc);
      var ess = require("./essentials");
      ess.init(commands, memelist, message, id, prefix, guild);
      var mod = require("./moderation");
      mod.init(commands, message, message.guild, id);
      var econ = require("./economy");
      econ.init(commands, message, message.guild, id, prefix);

      switch (command) {
        case "sifhelp":
        case "sif":
        case "commands":
        case "help":
            var list = commands.list(prefix);
            list.forEach((cmd, index) => {
              message.channel.send(cmd);
            });
          break;

        //Constantly changing values and how to view them:
        case "dollars":
        case "balance":
        case "coins":
            if (!args) {
              var cvalue = Math.round(ls.get(id + "coins"));
              message.reply(`you have **💵 ${cvalue} Dollars!**`);
            }
            else {
              var mmb = message.mentions.members.first();
              if (ls.exist(mmb.user.id + "coins")) {
                message.reply(`${mmb.user.username} has **💵 ${ls.get(mmb.user.id + "coins")} Dollars!**`);
              }
              else {
                message.reply("that user does not have any coin value yet.");
              }
            }
          break;
        case "toplist":
            var tlObj = ls.getObj(message.guild.id + "coins");
            message.channel.send(tl.coins(tlObj, id, message.guild.members));
          break;
        case "points":
        case "rank":
        case "guildrank":
            ess.guildPoints.send(coins, message.author.id);
          break;
        ////Everything after this point falls into the essentials, moderation, or economy categories:\\\\
        
        //Moderation:
        case "clear":
        case "delete":
        case "purge":
            mod.messages.purge(args);
          break;
        case "wl":
        case "whitelist":
            if (!isAdmin) { message.reply("insufficient permissions"); return false; } 
            args[0] = args[0].toLowerCase();
            if (args[0] == "list") {
              mod.guild.members.whitelist(2, args);
            }
            else if (args[0] == "add" || args[0] == "remove" || args[0] == "modify") {
              mod.guild.members.whitelist(3, args);
            }
            else {
              message.channel.send(`Usage: \`${prefix}${commands.get("Whitelist")}\``);
            } 
          break;
        case "lockdown":
            if (!isAdmin) { message.reply("insufficient permissions"); return false; }
            if (args[0] == "status") {
              args[0] = 2;
            }
            mod.guild.modes.lockdown(args[0]);
          break;
        case "enforce":
            if (!isAdmin) { message.reply("insufficient permissions"); return false; }
            if (args[0] == "status") {
              args[0] = 2;
            }
            mod.guild.modes.enforce(args[0]);
          break;
        case "whiteout":
            if (!isAdmin) { message.reply("insufficient permissions"); return false; }
            if (args[0] == "status") {
              args[0] = 2;
            }
            mod.guild.modes.whiteout(args[0]);
          break;
        case "chateau":
            if (!isAdmin) { message.reply("insufficient permissions"); return false; }
            if (args[0] == "status") {
              args[0] = 2;
            }
            mod.guild.invites.chateau(args[0]);
          break;

        //Essentials:
        case "sif:core":
            if (message.author.id == "274639466294149122" || message.member.hasPermission("ADMINISTRATOR")) {
              if (args[0] == "prefix") {
                ls.set(message.guild.id + "prefix", args[1]);
                message.reply("Set the prefix for this guild (" + message.guild + ") to " + args[1]);
              }
            }
            else {
              message.reply("you do not have adequate permission to do that.");
            }
          break;
        case "invite":
        case "info":
            message.channel.send(`\`Info on Project Sif\`
        
          At least one to two commands are added to this bot per week.
          Project Sif was created by Cannicide#2753.
          It is built and run on a server, so the bot will never go offline unless the server itself does.
          To report bugs, DM Cannicide or submit an issue on Github.
          For a commands list, do ${prefix}help
          Invite: ||${invite}||`); 
          break;

        //Economy:
        case "meme":
            ess.memes.send(multiplier);
          break;
        case "memeburst":
            ess.memes.burst(multiplier);
          break;
        case "multiplier":
            if (args[0] && args[0] == "view") {
              econ.multiplier.view();
            }
            else if (args[0]) {
              econ.multiplier.add();
            }
            else {
              econ.multiplier.help();
            }
          break;
        case "home":
            //Conquest of Cards
            econ.conquest.home(message, prefix);
          break;
        case "cards":
            //Conquest of Cards
            econ.conquest.cards.view(message, prefix);
          break;
        case "flasks":
            econ.conquest.flasks.view(message, prefix);
          break;
        case "cardinfo":
            //Conquest of Cards
            message.channel.send("Currently a work in progress... please check back later.");
          break;
        case "flaskopen":
            //Conquest of Cards
            message.channel.send("Currently a work in progress... please check back later.");
          break;

        //Misc:
        case "senpai":
            //NugScript
            var nug = require("./nugScript");
            nug.setMessage(message);
            nug.senpai();
          break;
        default:
            
          break;
      }

      message.channel.stopTyping();
    }, 1000);

  }
  catch(err) {
    message.channel.send(`Errors found:\n\`\`\`${err}\nAt ${err.stack}\`\`\``);
  }
});

client.on("guildMemberAdd", member => {
  const mbid = member.id;
  const isBot = member.user.bot;
  const mode = ls.get(member.guild.id + "mode");
  const chateau = ls.get(member.guild.id + "chateau");
  const whitelist = ls.getObj(member.guild.id + "whitelist");
  if (!mode && !chateau) return false;
  
  //Chateau Royal Invitations:
  if (chateau == "chateau") {
    var createdAt = member.user.createdAt;
    var currentDate = new Date();
    var crAtMonth = createdAt.getMonth();
    var cdMonth = currentDate.getMonth();
    var crAtYear = createdAt.getFullYear();
    var cdYear = currentDate.getFullYear();
    if (crAtMonth == cdMonth && crAtYear == cdYear) {
      //Flagged for possibly suspicious account activity
      member.kick("Potential suspicious activity; member's account was made within the month.").catch(err => {
        member.guild.systemChannel.send(`Chateau Setting failed to kick the following user for potential suspicious account activity: ${member.user.tag}`);
      });
    }
    else if (crAtMonth > cdMonth || crAtYear > cdYear) {
      //Definite suspicious activity, the result of a hacked account or a Discord/code error
      member.ban("Definite suspicious activity; member's account was made *after* current date.").catch(err => {
        member.guild.systemChannel.send(`Chateau Setting failed to ban the following user for definite suspicious account activity: ${member.user.tag}`);
      });
    }
    else {
      //Not flagged
    }
  }

  //Lockdown:
  if (mode == "lockdown") {
    if (isBot) {
      return false;
    }
    else {
      member.kick("Kicked user according to the guidelines of Lockdown.").catch(err => {
        member.guild.systemChannel.send(`Lockdown Mode failed to kick the following user: ${member.user.tag}\nPlease take immediate action.`);
      });
    }
  }

  //Enforce:
  if (mode == "enforce") {
    if (!isBot) {
      return false;
    }
    else {
      member.kick("Kicked bot according to the guidelines of Enforce.").catch(err => {
        member.guild.systemChannel.send(`Enforce Mode failed to kick the following bot: ${member.user.tag}\nPlease take immediate action.`);
      });;
    }
  }

  //Whiteout:
  if (mode == "whiteout") {
    if (!whitelist || whitelist.length < 1) {
      member.kick("Kicked user/bot (not on Whitelist) according to the guidelines of Whiteout.").catch(err => {
        member.guild.systemChannel.send(`Whiteout Mode failed to kick the following unwhitelisted user: ${member.user.tag}\nPlease take immediate action.`);
      });
    }
    else {
      var onWhitelist = false;
      whitelist.forEach((id, index) => {
        if (id == mbid) {
          onWhitelist = true;
        }
      });
      if (!onWhitelist) {
        member.kick("Kicked user/bot (not on Whitelist) according to the guidelines of Whiteout.").catch(err => {
          member.guild.systemChannel.send(`Whiteout Mode failed to kick the following unwhitelisted user: ${member.user.tag}\nPlease take immediate action.`);
        });
      }
      else {
        return false;
      }
    }
  }

});

  /*
  
 
  localstorage of message.author.id is COIN AMOUNT in old code
  localstorage of message.author.tag is MULTIPLIER in old code
  localstorage of message.guild is PREFIX in old code


  ls of id + "coins" is COIN AMOUNT in new code
  ls of id + "mult" is MULTIPLIER in new code
  ls of message.guild.id + "prefix" is PREFIX in new code


  */

client.login("your token here");  