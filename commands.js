var names;
var docs;
var doctype;
var desc;
var cmdtype;


function initialize(type) {
    names = [];
    docs = [];
    desc = [];
    doctype = [];
    cmdtype = type;
}

function getCommandDocs(name) {
    var nameIndex = names.indexOf(name);
    if (nameIndex) {
        return docs[nameIndex];
    }
    else {
        return false;
    }
}

function getCommandBases(msg) {
    var ess = require("./essentials");
    var tuser = msg.author.id;
    var essCmd = [];
    var modCmd = [];
    var ecoCmd = [];
    docs.forEach((doc, index) => {
        var type = doctype[index];
        if (doc.match(/\)/)) {
            var dcc = doc.split(")")[0].replace("(", "");
            dcc.split(" | ").forEach((base, index) => {
                if (type == "Essentials") {
                    essCmd.push(base);
                }
                else if (type == "Moderation") {
                    modCmd.push(base);
                }
                else if (type == "Economy") {
                    ecoCmd.push(base);
                }
            });
        }
        else {
            var base;
            if (doc.match(" ")) {
                base = doc.split(" ")[0];
            }
            else {
                base = doc;
            }

            if (type == "Essentials") {
                essCmd.push(base);
            }
            else if (type == "Moderation") {
                modCmd.push(base);
            }
            else if (type == "Economy") {
                ecoCmd.push(base);
            }
        }
    });

    msg.author.send(ess.messages.tripleEmbed(tuser, "Essentials", essCmd.join(", "), "Moderation", modCmd.join(", "), "Economy", ecoCmd.join(", ")));
}

function appendCommand(name, doc, description, dt) {
    var nameIndex = names.indexOf(name);
    if (nameIndex == -1) {
        names.push(name);
        docs.push(doc);
        desc.push(description);
        doctype.push(dt);
    }
    else {
        return false;
    }
}

function formatCommands(prefix) {
    let documents = `
        __\`\`\`md
        # Project Sif Commands #
        \`\`\`__
        \n
    `;
    names.forEach((name, index) => {
        documents += `
        \n\n**${name}**
        \`\`\`fix
        ${prefix}${docs[index]}
        \`\`\`
        ${desc[index]}
        `;
    });
    let docArray = [];
    if (documents.split("").length > 2000) {
        var over2000 = true;
        while (over2000) {
            let newDoc = documents.split("");
            if (newDoc.length <= 2000) {
                over2000 = false;
                docArray.push(documents);
                break;
            }
            else {
                docArray.push(documents.substring(0, 2000));
                documents = documents.substring(2000);
            }
        }
    }
    else {
        docArray = [documents];
    }
    return docArray;
    //Used to bypass Discord message character limit
}

const commands = {
    list: formatCommands,
    get: getCommandDocs,
    append: appendCommand,
    doctype: cmdtype,
    init: initialize,
    bases: getCommandBases
}

module.exports = commands;