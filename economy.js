var message, guild, id, prefix;
var ls = require("./sif-casino/ls");
var conquest = require("./conquest-of-cards");

function initialize(commands, messageVal, guildVal, idVal, fix) {
    commands.append("Multiplier", "multiplier <add/view>", "Use the multiplier command alone, without the add or view parameters, to see a detailed description.");

    //Initialize message, guild, and author ID
    message = messageVal;
    guild = guildVal;
    id = idVal;
    prefix = fix;
}

function addMultiplier() {
    if (ls.get(id + "coins") >= (1000 * Number(ls.get(id + "mult")))) {
        ls.set(id + "mult", (Number(ls.get(id + "mult")) * 2));
        ls.set(id + "coins", (Number(ls.get(id + "coins")) - (1000 * Number(ls.get(id + "mult")))));
        message.reply("Purchase successful! You now have a multiplier of x" + ls.get(id + "mult") + " dollars!");
    }
    else {
        message.reply("you do not have enough dollars to do that. Amount required: $" + (1000 * Number(ls.get(id + "mult"))) + "."); 
    }
}

function viewMultiplier() {
    message.channel.send(`Current multiplier: x${ls.get(id + "mult")}`);
}

function helpMultiplier() {
    message.channel.send("`How to Use Multiplier`\n\nUsage: `" + prefix + "multiplier <add/view>`\nExample: `" + prefix + "multiplier add`\nDescription: Buy a multiplier to earn more dollars per message (add), or view your current multiplier (view). Each multiplier costs 1000 times the current multiplier level. Default multiplier level is 1. Each purchase now doubles your multiplier, for faster grinding.");
}

const economy = {
    init: initialize,
    multiplier: {
        add: addMultiplier,
        view: viewMultiplier,
        help: helpMultiplier
    },
    conquest: conquest
}

module.exports = economy;