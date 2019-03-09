var message, guild, id;
var ls = require("./sif-casino/ls");


function initialize(commands, messageVal, guildVal, idVal) {
    commands.append("Purge", "purge [messages]", "Purges/clears the specified number of messages if you have the perms to do so.");

    //Initialize message, guild, and author ID
    message = messageVal;
    guild = guildVal;
    id = idVal;
}

function doPurge(args) {
    if (message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("MANAGE_MESSAGES")) {
        var purgeamnt = args[0];
        var purgelimit = purgeamnt + 1;
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
//0 = disable (null for Whitelist)
//1 = enable (null for Whitelist)
//2 = return current enabled status (returns whitelisted users/bots for Whitelist)
//3 = (adds specified members for Whitelist)
function guildLockdown(mode) {
    //Lockdown: Keep every user on the inside in, and every user on the outside out...
    //Does not apply to bots
    switch (mode) {
        case 0:

        break;
        case 1:

        break;
        case 2:

        break;
        case 3:
            return null;
        break;
    }
}

function guildEnforce(mode) {
    //Enforce: Prevent any and all bots from joining
    //Does not apply to users
    switch (mode) {
        case 0:

        break;
        case 1:

        break;
        case 2:

        break;
        case 3:
            return null;
        break;
    }
}

function guildWhiteout(mode) {
    //Keep everything out except for those already inside your server, and those on the Whitelist
    switch (mode) {
        case 0:
            
        break;
        case 1:
            
        break;
        case 2:

        break;
        case 3:
            return null;
        break;
    }
}

function guildChateau(mode) {
    //Prevent people on the whitelist from making invites
    //(Useful for preventing accidentally whitelisted newbie catastrophes in Guild Whiteout Mode)
    switch (mode) {
        case 0:
            
        break;
        case 1:
            
        break;
        case 2:

        break;
        case 3:

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
        break;
        case 3:
            //Add/remove to/from whitelist
            
        break;
    }
}

const moderation = {
    init: initialize,
    messages: {
        purge: doPurge
    },
    guild: {
        lockdown: guildLockdown,
        enforce: guildEnforce,
        whiteout: guildWhiteout,
        chateau: guildChateau,
        members: {
            whitelist: guildWhitelist
        }
    }
}

module.exports = moderation;