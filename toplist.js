
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
    [01.]        $${tl[0][1]}        ${gm[0]}
    [02.]        $${tl[1][1]}        ${gm[1]}
    [03.]        $${tl[2][1]}        ${gm[2]}
    [04.]        $${tl[3][1]}        ${gm[3]}
    [05.]        $${tl[4][1]}        ${gm[4]}
    [06.]        $${tl[5][1]}        ${gm[5]}
    [07.]        $${tl[6][1]}        ${gm[6]}
    [08.]        $${tl[7][1]}        ${gm[7]}
    [09.]        $${tl[8][1]}        ${gm[8]}
    [10.]        $${tl[9][1]}        ${gm[9]}
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