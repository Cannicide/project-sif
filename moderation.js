var message, guild, id;


function initialize(messageVal, guildVal, idVal) {
    //Initialize message, guild, and author ID
    message = messageVal;
    guild = guildVal;
    id = idVal;
}

const moderation = {
    init: initialize
}

module.exports = moderation;