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
        var charCards = char.cards;
        var charFlasks = char.flasks;
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
                    //ls.setObj(user.id + "conq", {cards: [f1], flasks: ["Starter Flask"]});
                }
                else {
                    seconds--;
                    message.edit(`Opening your *Starter Flask* in ${seconds} seconds... <a:sifcasinocoinloader:566407216790503434>`);
                }
            }, 1000);
        });
    }
}


//Export Module
module.exports = {
    home: homeScreen
}

//Sif Casino Coin Loader for aesthetic purposes: <:sifcasinocoinloader:566407216790503434>
//(Uses Sif Casino icon to hint at future inter-bot interaction features)