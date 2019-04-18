//Get Conquest of Cards Official Card Packs:
var cards = require("./conquest-card-packs");
var ls = require("./sif-casino/ls");
var rand = require("./sif-casino/random");

//Conquest of Cards Latest Theme (usually one of the 9 sectors):
const theme = "Octarean Sector";

//Conquest of Cards Flasks for the user to get more cards:
var flasks = {
    names: ["Starter Flask", "Starter Archaeus", "Octarean Expansion I", "Archaeus Evolution"],
    starter: function() {
        var cardIndex = rand.int(1, 5);
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
    },
    octareanExpansion: function() {
        var cardIndex = rand.int(1, 5);
        switch (cardIndex) {
            case 1:
                return cards.octExp.I.Archaeus;
            break;
            case 2:
            case 3:
                return cards.octExp.I.Octaeus;
            break;
            case 4:
            case 5:
                return cards.octExp.I.Venigland;
            break;
        }
    },
    archaeusEvolution: function() {
        var cardIndex = rand.int(1, 10);
        switch (cardIndex) {
            case 1:
            case 2:
            case 3:
            case 4:
                var c1 = cards.evolvedArchaeus.Archaeus;
                return c1;
            break;
            case 5:
            case 6:
            case 7:
                var c2 = cards.evolvedArchaeus.EnhancedArchaeus;
                return c2;
            break;
            case 8:
            case 9:
                var c3 = cards.evolvedArchaeus.WizardlyArchaeus;
                return c3;
            break;
            case 10:
                var c4 = cards.evolvedArchaeus.EvolvedArchaeus;
                return c4;
            break;
        }
    }
}

//Game functionality:
function homeScreen(message, prefix) {
    var user = message.author;
    var char = ls.getObj(user.id + "conq");

    if (char) {
        var cs = char.cards;
        var fs = char.flasks;
        var msg = `Welcome back, ${user.username}. | (${fs.length}) Flasks Pending | (${cs.length}) Cards Collected | <:gloins:566753335588159489> ${char.gloins} Gloins\nUse \`${prefix}flasks\` to open pending Flasks...\nUse \`${prefix}cards\` to view owned Conquest Cards...\nUse \`${prefix}shop\` to buy new Flasks and Conquest Cards at the shop...`;
        message.channel.send(msg);
    }
    else {
        var seconds = 10;
        message.channel.send("Welcome to Conquest of Cards! This is a simple in-discord game based on various cards, each representing a specific character. Each character card has special skills, moves, and powers. Collect cards and use them in duels to earn currency, buy more cards with currency, and earn Sif Coins from victory! Let's get you started with your first cards! Flasks contain cards, either new or old, and opening Flasks will give you said cards.\n\n** **");
        var secondInterval;
        message.channel.send(`Opening your *Starter Flask* in 10 seconds... <a:sifcasinocoinloader:566407216790503434>`).then((message) => {
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
        message.channel.send(`${user.username}'s Conquest Card Collection (${cs.length}): ${msg}.\n\nUse \`${prefix}cardinfo <cardIndex>\`, where <cardIndex> refers to the number beside a card in [square brackets].\nEx: \`${prefix}cardinfo 0\` could display information for [0] ⭐1 Archaeus Tetheros.`);
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
        message.channel.send(`${user.username}'s Unopened Flasks (${fs.length}): ${msg}.\n\nUse \`${prefix}flaskopen <flaskIndex>\`, where <flaskIndex> refers to the number beside a Flask in [square brackets].\nEx: \`${prefix}flaskopen 0\` could display information for [0] Starter Flask.`);
    }
}

function cardInfo(message, prefix, args) {
    var cardIndex = args[0];
    var user = message.author;
    var char = ls.getObj(user.id + "conq");

    if (!char || !cardIndex || !char.cards[cardIndex]) {
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
        message.channel.send(`${card.name}\n⭐${card.stars}\n\nLevel: ${card.level}\n\nType: ${card.type}\nBonus Opponent Type: ${card.bonus}\nHealth: ${card.health}\nBio: ${card.bio}\n\nMove 1 - ${card.m1.name}\nDamage: ${card.m1.dmg}\nUses: ${card.m1.uses}\n\nMove 2 - ${card.m2.name}\nDamage: ${card.m2.dmg}\nSpecial Effect: ${card.m2.special}\nUses: ${card.m2.uses}\n\nMove 3 - ${m3Name}\nDamage: ${m3Dmg}\nUses: ${m3Uses}`);
    }
}

function flaskOpen(message, prefix, args) {


    //Flask Array to translate: String -> Conquest
    var flaskEntities = [flasks.starter(), flasks.starterArchaeus(), flasks.octareanExpansion(), flasks.archaeusEvolution()];


    var flaskIndex = args[0];
    var user = message.author;
    var char = ls.getObj(user.id + "conq");

    if (!char || !flaskIndex || !char.flasks[flaskIndex]) {
        message.channel.send(`This command requires you to have at least one Flask and to specify which existent one you wish to open. New to the game? Use \`${prefix}home\` to get started.`);
    }
    else {
        var flask = char.flasks[flaskIndex];
        var seconds = 3;
        var secondInterval;
        message.channel.send(`Opening your *${flask}* in 3 seconds... <a:sifcasinocoinloader:566407216790503434>`).then((message) => {
            secondInterval = setInterval(() => {
                if (seconds == 0) {
                    clearInterval(secondInterval);
                    var f1 = flaskEntities[flasks.names.indexOf(flask)];
                    message.edit(`You opened a *${flask}* and got:\n\n\`Name - ${f1.name}\nType - ${f1.type}\nRating - ⭐${f1.stars}\nRarity - ${f1.rarity}/9\`\n\n** **`).then((message) => {
                        message.channel.send(`⭐${f1.stars} ${f1.name} added to your collection.\nUse \`${prefix}flasks\` to view and open your Flasks.\nUse \`${prefix}cards\` to view your collected cards and their statistics, including health, rating, bio, move information, and more.`);
                    });
                    char.cards.push(f1);
                    char.flasks.splice(flaskIndex, 1);
                    char.gloins += 5;
                    ls.setObj(user.id + "conq", char);
                }
                else {
                    seconds--;
                    message.edit(`Opening your *${flask}* in ${seconds} seconds... <a:sifcasinocoinloader:566407216790503434>`);
                }
            }, 1000);
        });
    }
}

var shop = {
    items: {
        //Item costs in Gloins
        flasks: {
            starter: 150,
            octexp1: 250,
            archaeusEvolved: 1500
        },
        conversion: {
            //Conversion cost in format of {1 Gloin: 20 Sif Coin} OR {1 Sif Coin: 5 Gloin}
            //with the left side being bought and the right side being paid
            sifCoins: 5,
            gloins: 20
        }
    },
    do: doShop
}

function showShopItems(message, prefix, char, user) {
    message.channel.send(`<a:sifcasinocoinloader:566407216790503434> ${theme} Shop | <:gloins:566753335588159489> ${char.gloins} | User: ${user.username}\n\n\nBuyable Flasks:\n\nStarter Flask - Obtain a simple, low-level starter character. - <:gloins:566753335588159489> ${shop.items.flasks.starter}\nOctarean Expansion I - Obtain a 1-2 star character from the Octarean Sector. - <:gloins:566753335588159489> ${shop.items.flasks.octexp1}\nEvolved Archaeus - Obtain variant, altered, and high-level versions of Archaeus Tetheros. - <:gloins:566753335588159489> ${shop.items.flasks.archaeusEvolved}\n\n\nCurrency Conversions:\n\nGloins -> Sif Coins - <:gloins:566753335588159489> ${shop.items.conversion.sifCoins}\nSif Coins -> Gloins - $${shop.items.conversion.gloins} (Sif Coins)\n\nUse \`${prefix}shop <Item to buy>\` to buy products from this shop.\nEx: \`${prefix}shop Starter Flask\` buys a Starter Flask from the shop.`);
}

function doShop(message, prefix, args) {
    var user = message.author;
    var char = ls.getObj(user.id + "conq");

    if (!char) {
        message.channel.send(`This command requires you to have an existent Conquest of Cards user profile. Use \`${prefix}home\` to get started.`);
    }
    else if (!args) {
        //Show shop contents
        showShopItems(message, prefix, char, user);
    }
    else {
        var item = args.join(" ");
        //Buy items
        switch (item.toLowerCase()) {

            //Flasks:
            case "starter flask":
                if (char.gloins >= shop.items.flasks.starter) {
                    //Can buy
                    char.gloins -= shop.items.flasks.starter;
                    char.flasks.push("Starter Flask");
                    message.channel.send(`Successfully purchased this item, ${user.username}.`);
                }
                else {
                    //Can't buy
                    message.channel.send(`Sorry, ${user.username}... You are missing the <:gloins:566753335588159489> ${shop.items.flasks.starter - char.gloins} more you need to buy this item.`);
                }
            break;
            case "octarean expansion":
            case "octarean expansion i":
                if (char.gloins >= shop.items.flasks.octexp1) {
                    //Can buy
                    char.gloins -= shop.items.flasks.octexp1;
                    char.flasks.push("Octarean Expansion I");
                    message.channel.send(`Successfully purchased this item, ${user.username}.`);
                }
                else {
                    //Can't buy
                    message.channel.send(`Sorry, ${user.username}... You are missing the <:gloins:566753335588159489> ${shop.items.flasks.octexp1 - char.gloins} more you need to buy this item.`);
                }
            break;
            case "archaeus evolution":
            case "archaeus evolved":
            case "evolved archaeus":
                if (char.gloins >= shop.items.flasks.archaeusEvolved) {
                    //Can buy
                    char.gloins -= shop.items.flasks.archaeusEvolved;
                    char.flasks.push("Archaeus Evolution");
                    message.channel.send(`Successfully purchased this item, ${user.username}.`);
                }
                else {
                    //Can't buy
                    message.channel.send(`Sorry, ${user.username}... You are missing the <:gloins:566753335588159489> ${shop.items.flasks.archaeusEvolved - char.gloins} more you need to buy this item.`);
                }
            break;

            //Conversion Items:
            case "sif coins":
            case "sifcoins":
                //Buy Sif Coins with Gloins
                if (char.gloins >= shop.items.conversion.sifCoins) {
                    //Can buy
                    char.gloins -= shop.items.conversion.sifCoins;
                    var sifCoins = ls.get(user.id + "coins");
                    sifCoins += 1;
                    ls.set(user.id + "coins", sifCoins);
                }
                else {
                    //Can't buy
                    message.channel.send(`Sorry, ${user.username}... You are missing the <:gloins:566753335588159489> ${shop.items.conversion.sifCoins - char.gloins} more you need to buy this item.`);
                }
            break;
            case "gloins":
            case "conquest currency":
                //Buy Gloins with Sif Coins
                var sifCoins = ls.get(user.id + "coins");
                if (sifCoins >= shop.items.conversion.gloins) {
                    //Can buy
                    sifCoins -= shop.items.conversion.gloins;
                    ls.set(user.id + "coins", sifCoins);
                    char.gloins += 1;
                    message.channel.send(`Purchased one Gloin for $20 (Sif Coins), ${user.username}.`);
                }
                else {
                    //Can't buy
                    message.channel.send(`Sorry, ${user.username}... You are missing the $${shop.items.conversion.gloins - sifCoins} (Sif Coins) more you need to buy this item.`);
                }
            break;
            default:
                //Unknown item sent
                showShopItems(message, prefix, char, user);

        }
        ls.setObj(user.id + "conq", char);
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
        view: viewFlasks,
        open: flaskOpen
    },
    shop: shop.do
}

//Sif Casino Coin Loader for aesthetic purposes: <:sifcasinocoinloader:566407216790503434>
//(Uses Sif Casino icon to hint at future inter-bot interaction features)