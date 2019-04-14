//Get Conquest of Cards Official Card Packs:
var cards = require("./conquest-card-packs");
var ls = require("./sif-casino/ls");
var rand = require("./sif-casino/random");

//Conquest of Cards Flasks for the user to get more cards:
var flasks = {
    starter: function() {
        var cardIndex = rand(1, 5);
        switch (cardIndex) {
            case 1:
                return cards.default.Venigland;
            break;
            case 2:
            case 3:
                return cards.default.Octaeus;
            break;
            case 4:
                return cards.default.Overkill;
            break;
            case 5:
                return cards.default.Prime;
            break;
        }
    },
    starterArchaeus: function() {
        return cards.default.Archaeus;
    }
}

//Game functionality:
function homeScreen(message, prefix) {
    var user = message.author;
    var char = ls.getObj(user.id + "conq");

    if (char) {
        var cs = char.cards;
        var fs = char.flasks;
        var msg = `Welcome back, ${user.username}. | (${cs.length}) Flasks Pending | (${fs.length}) Cards Collected | <:gloins:566753335588159489> ${char.gloins} Gloins\nUse \`${prefix}flasks\` to open pending Flasks...\nUse \`${prefix}cards\` to view owned Conquest Cards...`;
        message.channel.send(msg);
    }
    else {
        var seconds = 10;
        message.channel.send("Welcome to Conquest of Cards! This is a simple in-discord game based on various cards, each representing a specific character. Each character card has special skills, moves, and powers. Collect cards and use them in duels to earn currency, buy more cards with currency, and earn Sif Coins from victory! Let's get you started with your first cards! Flasks contain cards, either new or old, and opening Flasks will give you said cards.\n\n** **");
        var secondInterval;
        message.channel.send(`Opening your Starter Flask in 10 seconds... <a:sifcasinocoinloader:566407216790503434>`).then((message) => {
            secondInterval = setInterval(() => {
                if (seconds == 0) {
                    clearInterval(secondInterval);
                    var f1 = flasks.starterArchaeus();
                    message.edit(`You opened a *Starter Flask* and got:\n\n\`Name - ${f1.name}\nType - ${f1.type}\nRating - ⭐${f1.stars}\nRarity - ${f1.rarity}/9\`\n\n** **`).then((message) => {
                        message.channel.send(`⭐${f1.stars} ${f1.name} added to your collection. An additional *Starter Flask* was added to your inventory.\nUse \`${prefix}flasks\` to view and open your Flasks.\nUse \`${prefix}cards\` to view your collected cards and their statistics, including health, rating, bio, move information, and more.`);
                    });
                    ls.setObj(user.id + "conq", {cards: [f1], flasks: ["Starter Flask"], mastery: 0, gloins: 100});
                }
                else {
                    seconds--;
                    message.edit(`Opening your *Starter Flask* in ${seconds} seconds... <a:sifcasinocoinloader:566407216790503434>`);
                }
            }, 1000);
        });
    }
}

function viewCollectedCards(message, prefix) {
    var user = message.author;
    var char = ls.getObj(user.id + "conq");

    if (!char) {
        message.channel.send(`You need to own cards before you can view them! Use \`${prefix}home\` to get started.`);
    }
    else {
        var cs = char.cards;
        var msg = "";
        cs.forEach((card, index) => {
            var addon = ", ";
            if (cs.length == 1 || index == cs.length - 1) {
                addon = "";
            }
            msg += `[${index}] ⭐${card.stars} ${card.name}${addon}`;
        });
        message.channel.send(`${user.username}'s Conquest Card Collection (${cs.length}): ${msg}.\nUse \`${prefix}cardinfo <cardIndex>\`, where <cardIndex> refers to the number beside a card in [square brackets].\nEx: \`${prefix}cardinfo 0\` could display information for [0] ⭐1 Archaeus Tetheros.`);
    }
}

function viewFlasks(message, prefix) {
    var user = message.author;
    var char = ls.getObj(user.id + "conq");

    if (!char) {
        message.channel.send(`You need to own Flasks before you can view them! Use \`${prefix}home\` to get started.`);
    }
    else if (!char.flasks || char.flasks.length < 1) {
        message.channel.send("You need to own Flasks before you can view them. Win battles or visit the Shop to obtain Flasks.");
    }
    else {
        var fs = char.flasks;
        var msg = "";
        fs.forEach((flask, index) => {
            var addon = ", ";
            if (fs.length == 1 || index == fs.length - 1) {
                addon = "";
            }
            msg += `[${index}] ${flask}${addon}`;
        });
        message.channel.send(`${user.username}'s Unopened Flasks (${fs.length}): ${msg}.\nUse \`${prefix}flaskopen <flaskIndex>\`, where <flaskIndex> refers to the number beside a Flask in [square brackets].\nEx: \`${prefix}flaskopen 0\` could display information for [0] Starter Flask.`);
    }
}

function cardInfo(message, prefix, args) {
    var cardIndex = args[0];
    var user = message.author;
    var char = ls.getObj(user.id + "conq");

    if (!char || !char.cards[cardIndex] || !cardIndex) {
        message.channel.send(`This command requires you to have at least one Conquest Card and to specify which existent one you wish to view. New to the game? Use \`${prefix}home\` to get started.`);
    }
    else {
        var card = char.cards[cardIndex];
        var m3Name = card.m3.name;
        var m3Dmg = card.m3.dmg;
        var m3Uses = card.m3.uses;
        if (!card.m3) {
            m3Name = "None";
            m3Dmg = "None";
            m3Uses = "None";
        }
        message.channel.send(`${card.name}\n⭐${card.stars}\n\nType: ${card.type}\nBonus Opponent Type: ${card.bonus}\nHealth: ${card.health}\nBio: ${card.bio}\n\nMove 1 - ${card.m1.name}\nDamage: ${card.m1.dmg}\nUses: ${card.m1.uses}\n\nMove 2 - ${card.m2.name}\nDamage: ${card.m2.dmg}\nSpecial Effect: ${card.m2.special}\nUses: ${card.m2.uses}\n\nMove 3 - ${m3Name}\nDamage: ${m3Dmg}\nUses: ${m3Uses}`);
    }
}


//Export Module
module.exports = {
    home: homeScreen,
    cards: {
        view: viewCollectedCards,
        info: cardInfo
    },
    flasks: {
        view: viewFlasks
    }
}

//Sif Casino Coin Loader for aesthetic purposes: <:sifcasinocoinloader:566407216790503434>
//(Uses Sif Casino icon to hint at future inter-bot interaction features)