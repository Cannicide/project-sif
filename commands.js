var names;
var docs;
var doctype;
var desc;


function initialize(type) {
    names = [];
    docs = [];
    desc = [];
    doctype = type;
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

function appendCommand(name, doc, description) {
    var nameIndex = names.indexOf(name);
    if (nameIndex == -1) {
        names.push(name);
        docs.push(doc);
        desc.push(description);
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
    doctype: doctype,
    init: initialize
}

module.exports = commands;