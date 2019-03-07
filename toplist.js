
function topListCoins(toplistObject, memberId, guildMembers) {
    let tl = toplistObject;
    let id = memberId;
    var userIndex = "Unknown";
    tl.sort(function(a,b) {
        return b[1] - a[1];
    });
    tl.forEach((mbcn, index) => {
        if (mbcn[0] == id) {
            userIndex = index;
        }
    });
    if (tl.length < 10) {
        tl.push(["-", "$0"]);
        tl.push(["-", "$0"]);
        tl.push(["-", "$0"]);
        tl.push(["-", "$0"]);
        tl.push(["-", "$0"]);
        tl.push(["-", "$0"]);
        tl.push(["-", "$0"]);
        tl.push(["-", "$0"]);
        tl.push(["-", "$0"]);
        tl.push(["-", "$0"]);
        //Fixes any array out-of-index-range issues
    }
    return `
        __**Top Richest People In This Guild**__

        \`\`\`ini
            [1.]        ${guildMembers.find("id", tl[0][0])}        $${tl[0][1]}
            [2.]        ${guildMembers.find("id", tl[1][0])}        $${tl[1][1]}
            [3.]        ${guildMembers.find("id", tl[2][0])}        $${tl[2][1]}
            [4.]        ${guildMembers.find("id", tl[3][0])}        $${tl[3][1]}
            [5.]        ${guildMembers.find("id", tl[4][0])}        $${tl[4][1]}
            [6.]        ${guildMembers.find("id", tl[5][0])}        $${tl[5][1]}
            [7.]        ${guildMembers.find("id", tl[6][0])}        $${tl[6][1]}
            [8.]        ${guildMembers.find("id", tl[7][0])}        $${tl[7][1]}
            [9.]        ${guildMembers.find("id", tl[8][0])}        $${tl[8][1]}
            [10.]       ${guildMembers.find("id", tl[9][0])}        $${tl[9][1]}
        \`\`\`

        *Your position:* [${userIndex + 1}.]        ${guildMembers.find("id", tl[userIndex][0])}        $${tl[userIndex][1]}
    `;
}


const toplist = {
    details: {
        name: "Toplist",
        usage: "tl [coins/points]",
        desc: "Displays top richest people in the current guild, and your position on the leaderboards."
    },
    coins: topListCoins
}

module.exports = toplist;