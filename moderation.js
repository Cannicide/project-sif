var message, guild, id;
var ls = require("./sif-casino/ls");


function initialize(commands, messageVal, guildVal, idVal) {
    commands.append("Purge", "purge [messages]", "Purges/clears the specified number of messages if you have the perms to do so.");
    commands.append("Whitelist", "whitelist [list/modify]");

    //Initialize message, guild, and author ID
    message = messageVal;
    guild = guildVal;
    id = idVal;
}

function doPurge(args) {
    if (message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("MANAGE_MESSAGES")) {
        var purgeamnt = args[0];
        var purgelimit = Number(purgeamnt) + 1;
        message.channel.fetchMessages({ limit: purgelimit }).then(messages => {
          message.channel.bulkDelete(messages);
          message.reply("deleted " + messages.array().length + " messages, including deletion command!");
        }).catch(err => {
            message.channel.send("Failed to delete messages.\n```\nError:\n" + err.stack + "\n```");
        });
    }
    else {
        message.reply("you do not have enough permissions to delete messages.");
    }
}

//----------------------------------Guild Modes-------------------------------------
//Integer mode possible values:
//disable = disable (null for Whitelist)
//enable = enable (null for Whitelist)
//2 = return current enabled status (returns whitelisted users/bots for Whitelist)
//3 = (adds specified members for Whitelist)
function guildLockdown(mode) {
    //Lockdown: Keep every user on the inside in, and every user on the outside out...
    //Does not apply to bots
    var enabled = false;
    if (ls.exist(guild.id + "mode")) {
        enabled = ls.get(guild.id + "mode");
    }
    switch (mode) {
        case "disable":
            if (enabled && enabled == "lockdown") {
                ls.remove(guild.id + "mode");
                message.reply(`disabled lockdown mode for this guild.`);
            }
        break;
        case "enable":
            if (enabled != "lockdown") {
                ls.set(guild.id + "mode", "lockdown");
                message.reply(`enabled lockdown mode and consequently disabled ${enabled} mode for this guild.`);
            }
        break;
        case 2:
            if (enabled == "lockdown") {
                message.reply("Lockdown Mode is currently enabled for this guild.");
            }
            else {
                message.reply("Lockdown Mode is currently disabled for this guild.");
            }
        break;
        case 3:
            return null;
        break;
    }
}

function guildEnforce(mode) {
    //Enforce: Prevent any and all bots from joining
    //Does not apply to users
    var enabled = false;
    if (ls.exist(guild.id + "mode")) {
        enabled = ls.get(guild.id + "mode");
    }
    switch (mode) {
        case "disable":
            if (enabled && enabled == "enforce") {
                ls.remove(guild.id + "mode");
                message.reply(`disabled enforce mode for this guild.`);
            }
        break;
        case "enable":
            if (enabled != "enforce") {
                ls.set(guild.id + "mode", "enforce");
                message.reply(`enabled enforce mode and consequently disabled ${enabled} mode for this guild.`);
            }
        break;
        case 2:
            if (enabled == "enforce") {
                message.reply("Enforce Mode is currently enabled for this guild.");
            }
            else {
                message.reply("Enforce Mode is currently disabled for this guild.");
            }
        break;
        case 3:
            return null;
        break;
    }
}

function guildWhiteout(mode) {
    //Keep everything out except for those already inside your server, and those on the Whitelist
    var enabled = false;
    if (ls.exist(guild.id + "mode")) {
        enabled = ls.get(guild.id + "mode");
    }
    switch (mode) {
        case "disable":
            if (enabled && enabled == "whiteout") {
                ls.remove(guild.id + "mode");
                message.reply(`disabled whiteout mode for this guild.`);
            }
        break;
        case "enable":
            if (enabled != "whiteout") {
                ls.set(guild.id + "mode", "whiteout");
                message.reply(`enabled whiteout mode and consequently disabled ${enabled} mode for this guild.`);
            }
        break;
        case 2:
            if (enabled == "whiteout") {
                message.reply("Whiteout Mode is currently enabled for this guild.");
            }
            else {
                message.reply("Whiteout Mode is currently disabled for this guild.");
            }
        break;
        case 3:
            return null;
        break;
    }
}

function guildChateau(mode) {
    //Prevent people who have recently made their account (within one month) from joining
    //(Useful for preventing raid accounts from joining)
    var enabled = false;
    if (ls.exist(guild.id + "chateau")) {
        enabled = ls.get(guild.id + "chateau");
    }
    switch (mode) {
        case "disable":
            if (enabled && enabled == "chateau") {
                ls.remove(guild.id + "chateau");
                message.reply(`disabled Chateau Royal Invitations for this guild.`);
            }
        break;
        case "enable":
            if (enabled != "chateau") {
                ls.set(guild.id + "chateau", "chateau");
                message.reply(`enabled Chateau Royal Invitations for this guild.`);
            }
        break;
        case 2:
            if (enabled == "chateau") {
                message.reply("Chateau Royal Invitations are currently enabled for this guild.");
            }
            else {
                message.reply("Chateau Royal Invitations currently disabled for this guild.");
            }
        break;
        case 3:
            return null;
        break;
    }
}

function guildWhitelist(mode, args) {
    //Adds specified people (in args) to the whitelist
    //Used in Guild Whiteout and Chateau modes
    var whitelistUsers = false;
    if (ls.exist(guild.id + "whitelist") && ls.getObj(guild.id + "whitelist").length >= 1) {
        whitelistUsers = ls.getObj(guild.id + "whitelist");
    }
    switch (mode) {
        case 0:
            return null;
        break;
        case 1:
            return null;
        break;
        case 2:
            //List of users/bots whitelisted
            if (whitelistUsers) {
                message.channel.send(`**Current Whitelist of ${guild.name}:**\n${whitelistUsers.join(", ")}`);
            }
            else {
                message.reply(`there currently is no whitelist in, or are no members in the whitelist of, this guild: ${guild.name}.`);
            }
        break;
        case 3:
            //Add/remove to/from whitelist
            var userIQ = [message.mentions.members.first()];
            if (!userIQ[0]) {
                var isAcceptable = true;
                args.slice(1).forEach((item, index) => {
                    if (item.length != 18) {
                        isAcceptable = false;
                    }
                });
                if (isAcceptable) {
                    //Utilize arguments of user IDs
                    userIQ = args.slice(1);
                }
                else {
                    //Invalid user stuffs
                    message.reply("the format of the users to add/remove must all be in valid ID or mention form.");
                    return false;
                }
            }
            if (whitelistUsers) {
                var removedCount = 0;
                var addedCount = 0;
                userIQ.forEach((item, index) => {
                    var anyMatch = false;
                    whitelistUsers.forEach((item2, index2) => {
                        if (item == item2) {
                            whitelistUsers.splice(index2, 1);
                            anyMatch = true;
                        }
                    });
                    if (anyMatch) {
                        removedCount += 1;
                    }
                    else {
                        whitelistUsers.push(item);
                        addedCount += 1;
                    }
                });
                message.reply(`added ${addedCount} users to the Whitelist, and removed ${removedCount} users from the Whitelist. (Users are removed from the whitelist if they are already on it and this command is used on them again).`);
            }
            else {
                ls.setObj(guild.id + "whitelist", userIQ);
                message.reply(`you added ${userIQ.join(", ")} to this guild's Whitelist.`);
            }
        break;
    }
}

const moderation = {
    init: initialize,
    messages: {
        purge: doPurge
    },
    guild: {
        modes:{
            lockdown: guildLockdown,
            enforce: guildEnforce,
            whiteout: guildWhiteout
        },
        invites: {
            chateau: guildChateau
        },
        members: {
            whitelist: guildWhitelist
        }
    }
}

module.exports = moderation;