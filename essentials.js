var memelist = [];
var message;
var id;
var prefix;
var guild;
var client;
var ls = require("./sif-casino/ls");

function initialize(commands, meme, msg, memberID, fix, guildID, clientX) {
    commands.append("Meme", "meme", "Sends a random meme at the cost of 10 times your current multiplier.", "Essentials");
    commands.append("Meme (Burst)", "memeburst", "Sends 5 random memes at the cost of 50 times your current multiplier.", "Essentials");
    commands.append("Guild Rank/Points", "(points | rank | guildrank) <optional other user>", "Displays your or someone else's guild points.", "Essentials");
    commands.append("Bot Invite/Info", "(invite | info) <command>", "Gives you important bot information and an invite to add the bot to your own server!", "Essentials");
    commands.append("Coins/Dollars", "(dollars | coins | balance) <optional user mention>", "Retrieves your coin balance, or the coin balance of another mentioned user.", "Essentials");
    commands.append("Help and Sifhelp", "(sifhelp | help | sif) <command>", "Sends a detailed list of commands to be used with and on Project Sif.", "Essentials");
    commands.append("Emote Info", "(emoji | emote | emojiInfo | emoteInfo) [emote name]", "Gets details about any emotes in a guild, such as emotes' IDs.", "Essentials");
    commands.append("Command List", "(commands | list)", "Sends a list of commands organized by category.", "Essentials");

    //Initialize memelist and other resources:
    memelist = meme;
    message = msg;
    id = memberID;
    prefix = fix;
    guild = guildID;
    client = clientX;
}

function sendMeme(multiplier) {
    var memecost = 10 * Number(multiplier);
            if ((Number(ls.get(id + "coins")) > memecost || Number(ls.get(id + "coins")) == memecost)) {
              var rndnumb = Math.floor(Math.random() * 51);
              var dankmemer = memelist[rndnumb].replace("&amp;", "&");
              message.channel.send(dankmemer).then(() => {
                ls.set(id + "coins", (Number(ls.get(id + "coins")) - Number(memecost)));
              });
            }
            else if (Number(ls.get(id + "coins")) < memecost) {
              message.reply("each meme costs " + memecost + " dollars... check your dollar balance with: " + prefix + "coins");
            }
}

function check5(a1, a2, a3, a4, a5) {
    var sArr = [a1, a2, a3, a4, a5];
    var endArr = [a1, a2, a3, a4, a5];
    for (var i = 0; i < 5; i++) {
        for (var x = i + 1; i < 5; i++) {
            if (sArr[i] == sArr[x]) {
                var rndnumb = Math.floor(Math.random() * 101);
                while (rndnumb == sArr[i] || rndnumb == sArr[x]) {
                    rndnumb = Math.floor(Math.random() * 101);
                }
                endArr[i] = rndnumb;
            }
        }
    }
    return endArr;
}

function sendMemeBurst(multiplier) {
    var memecost = 10 * Number(multiplier);
          if ((Number(ls.get(id + "coins")) > memecost * 5 || Number(ls.get(id + "coins")) == memecost * 5)) {
            var rndnumb = Math.floor(Math.random() * 101);
            var rndnumb2 = Math.floor(Math.random() * 101);
            var rndnumb3 = Math.floor(Math.random() * 101);
            var rndnumb4 = Math.floor(Math.random() * 101);
            var rndnumb5 = Math.floor(Math.random() * 101);
            var rnds = check5(rndnumb, rndnumb2, rndnumb3, rndnumb4, rndnumb5);
            var dankmemer = memelist[rnds[0]].replace("&amp;", "&");
            var dankmemer2 = memelist[rnds[1]].replace("&amp;", "&");
            var dankmemer3 = memelist[rnds[2]].replace("&amp;", "&");
            var dankmemer4 = memelist[rnds[3]].replace("&amp;", "&");
            var dankmemer5 = memelist[rnds[4]].replace("&amp;", "&");
            message.channel.send("From https://reddit.com/r/dankmemes - Upvote them there!", {files: [{attachment:dankmemer, name:"sifmeme.jpg"}]}).then(() => {
              ls.set(id + "coins", (Number(ls.get(id + "coins")) - Number(memecost)));
            });
            message.channel.send({files: [{attachment:dankmemer2, name:"sifmeme.jpg"}]}).then(() => {
              ls.set(id + "coins", (Number(ls.get(id + "coins")) - Number(memecost)));
            });
            message.channel.send({files: [{attachment:dankmemer3, name:"sifmeme.jpg"}]}).then(() => {
              ls.set(id + "coins", (Number(ls.get(id + "coins")) - Number(memecost)));
            });
            message.channel.send({files: [{attachment:dankmemer4, name:"sifmeme.jpg"}]}).then(() => {
              ls.set(id + "coins", (Number(ls.get(id + "coins")) - Number(memecost)));
            });
            message.channel.send({files: [{attachment:dankmemer5, name:"sifmeme.jpg"}]}).then(() => {
              ls.set(id + "coins", (Number(ls.get(id + "coins")) - Number(memecost)));
            });
          }
          else if (Number(ls.get(id + "coins")) < memecost * 5) {
            message.reply("these 5 memes cost " + (memecost * 5) + " dollars... check your dollar balance with: " + prefix + "coins");
          }
}

function msgEmbed(userID, title, mess, title2, mess2) {
    var tuser = client.users.find("id", userID);
    return {embed: {
        color: /*3447003*/tuser.toString().substring(2, 8),
        author: {
          name: tuser.username,
          icon_url: tuser.avatarURL
        },
        /*title: "Project Sif",
        url: "https://discord.gg/wYKRB9n",
        description: "A javascript bot capable of magnificient feats.",*/
        fields: [{
            name: title,
            value: mess
        }, {
            name: title2,
            value: mess2
        }],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "Project Sif"
        }
      }
    };
}

function tMsgEmbed(userID, title, mess, title2, mess2, title3, mess3) {
    var tuser = client.users.find("id", userID);
    return {embed: {
        color: /*3447003*/tuser.toString().substring(2, 8),
        author: {
          name: tuser.username,
          icon_url: tuser.avatarURL
        },
        /*title: "Project Sif",
        url: "https://discord.gg/wYKRB9n",
        description: "A javascript bot capable of magnificient feats.",*/
        fields: [{
            name: title,
            value: mess
        }, {
            name: title2,
            value: mess2
        }, {
            name: title3,
            value: mess3
        }],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "Project Sif"
        }
      }
    };
}

function getEmojiID(args) {
    if (!args || args.length != 1) {
        message.channel.send("Please specify the name of a valid emoji in this guild to use this command.");
        return false;
    }
    var emoteName = args[0];
    var emoteId;
    var emote = message.guild.emojis.find(emoji => emoji.name == emoteName);
    if (emote) {
        emoteId = emote.id;
        message.react(emoteId);
        message.channel.send(msgEmbed(message.author.id, "Emote Name", emoteName, "Emote ID", emoteId));
    }
    else {
        message.channel.send("Sorry, I was unable to find an emote in this guild with that name.");
    }
}

function sendGuildRank(coins, messageID) {
    var pointid = messageID;
    //var intropoint = "You have ";
    if (message.mentions.users.first()) {
        pointid = message.mentions.users.first().id;
        //intropoint = `${pointid}` + " has ";
    }
    var memberindex = 0;
    var ismember = false;
    if (ls.exist(guild + "guildpoints")) {
        //Guild ranking system already set up
        ls.getObj(guild + "guildpoints").forEach(function(item, index) {
            if (item[0] == pointid) {
                ismember = true;
                memberindex = index;
            }
        });
    }
    else {
        message.channel.send("There are no guild points!");
        console.log(id);
        return false;
    }

    var guildpoints = ls.getObj(guild + "guildpoints")[memberindex];
    if (guildpoints[0] == pointid && ismember) {
        var score = Number(guildpoints[1]);
        var guildrank = "Newbie";
        if (score >= 25) {
            guildrank = "Trainee";
        }
        if (score >= 50) {
            guildrank = "Janitor ";
            if (coins >= 1000000) {
                guildrank += "V (Millionaire)";
            }
            else if (coins >= 500000) {
                guildrank += "IV (Pre-Millions)";
            }
            else if (coins >= 100000) {
                guildrank += "III ($100K Broom)";
            }
            else if (coins >= 50000) {
                guildrank += "II (Mop Model Vlogger)";
            }
            else if (coins >= 1000) {
                guildrank += "I (Poverty Liner)";
            }
            else {
                guildrank += "(Poor Thing)";
            }
        }
        if (score >= 100) {
            guildrank = "Lame Memer";
        }
        if (score >= 125) {
            guildrank = "Lame Gamer";
        }
        if (score >= 150) {
            guildrank = "Pancho Villa ";
            if (score >= 450) {
                guildrank += "V (Escape Artist)";
            }
            else if (score >= 400) {
                guildrank += "IV (Magician)";
            }
            else if (score >= 300) {
                guildrank += "III (Top Offender)";
            }
            else if (score >= 250) {
                guildrank += "II (11th Year)";
            }
            else if (score >= 200) {
                guildrank += "I (Generalissimo)";
            }
            else {
                guildrank += " (Noob Edition)";
            }
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
        if (score >= 1100) {
            guildrank = "Calcoholic I";
        }
        if (score >= 1200) {
            guildrank = "Calcoholic II";
        }
        if (score >= 1300) {
            guildrank = "Calcoholic III";
        }
        if (score >= 1400) {
            guildrank = "Calcolator I";
        }
        if (score >= 1500) {
            guildrank = "Calcolator II";
        }
        if (score >= 1600) {
            guildrank = "Calcolator III";
        }
        if (score >= 1700) {
            guildrank = "Mercury I";
        }
        if (score >= 1800) {
            guildrank = "Mercury II";
        }
        if (score >= 1900) {
            guildrank = "Mercury III";
        }
        if (score >= 2000) {
            guildrank = "Mercury IV";
        }
        if (score >= 2100) {
            guildrank = "Mercury V";
        }
        if (score >= 2200) {
            guildrank = "Venus I";
        }
        if (score >= 2300) {
            guildrank = "Venus II";
        }
        if (score >= 2400) {
            guildrank = "Venus III";
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
            guildrank = "Cannicidetier Thing ";
            if (coins <= 1000000000) {
                guildrank += "I (Fake Cannicide)";
            }
            else {
                guildrank += "II (True Cannicide)";
            }
        }
        if (score >= 1000000000000) {
            guildrank = "Quadrillionaire ";
            if (coins >= 1000000000000) {
                guildrank += "III (True Quadrillionaire)";
            }
            else if (coins >= 1000000000) {
                guildrank += "II (Buadrillionaire*)";
            }
            else {
                guildrank += "I (In Poverty?!)";
            }
        }
        if (score >= 1000000000000000) {
            guildrank = "Delete Your Discord Right Now";
        }
        message.channel.send(msgEmbed(pointid, "Guild Points", /*intropoint + */"Points: " + score + " guild points.", "Guild Rank", "Rank: " + guildrank + "."));
    }
    else {
        message.channel.send(`<@${pointid}> has not sent any messages in a guild with me in it, and thus does not have any guild points 😦`);
    }

}

const essentials = {
    init: initialize,
    memes: {
        send: sendMeme,
        burst: sendMemeBurst
    },
    guildPoints: {
        send: sendGuildRank
    },
    messages: {
        embed: msgEmbed,
        emoteInfo: getEmojiID,
        tripleEmbed: tMsgEmbed
    }
}

module.exports = essentials;