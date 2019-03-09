var message, guild, id;


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

const moderation = {
    init: initialize,
    messages: {
        purge: doPurge
    }
}

module.exports = moderation;