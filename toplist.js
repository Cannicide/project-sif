
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
        tl.push(["-", "00"]);
        tl.push(["-", "00"]);
        tl.push(["-", "00"]);
        tl.push(["-", "00"]);
        tl.push(["-", "00"]);
        tl.push(["-", "00"]);
        tl.push(["-", "00"]);
        tl.push(["-", "00"]);
        tl.push(["-", "00"]);
        tl.push(["-", "00"]);
        //Fixes any array out-of-index-range issues
    }
    var gm = [];
    for (var i = 0; i <= 9; i++) {
        if (!guildMembers.find("id", tl[i][0])) {
            gm[i] = "-";
        }
        else {
            gm[i] = guildMembers.find("id", tl[i][0]).user.tag;
        }
    }
    return `
    __**Top Richest People In This Guild**__

    \`\`\`ini
    [1.]        ${gm[0]}        $${tl[0][1]}
    [2.]        ${gm[1]}        $${tl[1][1]}
    [3.]        ${gm[2]}        $${tl[2][1]}
    [4.]        ${gm[3]}        $${tl[3][1]}
    [5.]        ${gm[4]}        $${tl[4][1]}
    [6.]        ${gm[5]}        $${tl[5][1]}
    [7.]        ${gm[6]}        $${tl[6][1]}
    [8.]        ${gm[7]}        $${tl[7][1]}
    [9.]        ${gm[8]}        $${tl[8][1]}
    [10.]       ${gm[9]}        $${tl[9][1]}
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