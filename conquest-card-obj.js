//Conquest Card Object

/**
 * 
 * @param {Object} p0
 * @param {String} p0.name - The card's name
 * @param {Number} p0.rating - The card's power rating, used for Star ranks
 * @param {"Chemical" | "Mystic" | "Tech" | "Stellar" | "Skilled" | "Genetic"} p0.type - The type or origin of the card's powers
 * @param {String} p0.desc - Description of the card, a brief bio
 * @param {Number} p0.health - Average health of the card in its 0 Stars form
 * @param {Object} p0.move1
 * @param {String} p0.move1.name - Name of this move
 * @param {Number} p0.move1.dmg - Damage that this move for the card does
 * @param {Number} p0.move1.uses - Number of times this move can be used
 * @param {Object} p0.move2
 * @param {String} p0.move2.name - Name of this move
 * @param {Number} p0.move2.dmg - Damage that this move for the card does
 * @param {Number} p0.move2.uses - Number of times this move can be used
 * @param {"Poison" | "Disease" | "Bruises" | "None"} p0.move2.special - Special effects inflicted on the enemy by this move
 * @param {Object} p0.move3 - Optional third move, set to false if nonexistent
 * @param {String} p0.move3.name - Name of this move
 * @param {Number} p0.move3.dmg - Damage that this move for the card does
 * @param {Number} p0.move3.uses - Number of times this move can be used
 * @param {"Chemical" | "Mystic" | "Tech" | "Stellar" | "Skilled" | "Genetic"} p0.bonusType - Enemy type that gives this card a bonus in damage and health
 * @param {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9} p0.rarity - Approximate rarity of card, in terms of 0-9 difficulty to collect
 */
function Conquest({name, rating, type, desc, health, move1, move2, move3, bonusType, rarity}) {
    this.name = name;
    this.rating = rating;
    this.rarity = rarity;
    if (rating >= 5000) {
        this.stars = 6;
    }
    else if (rating >= 1000) {
        this.stars = 5;
    }
    else if (rating >= 500) {
        this.stars = 4;
    }
    else if (rating >= 400) {
        this.stars = 3;
    }
    else if (rating >= 200) {
        this.stars = 2;
    }
    else {
        this.stars = 1;
    }
    this.type = type;
    this.bonus = bonusType;
    this.bio = desc;
    this.health = health + this.stars * 50;
    this.m1 = {
        name: move1.name,
        dmg: move1.damage,
        uses: move1.uses,
        used: 0
    };
    this.m2 = {
        name: move2.name,
        dmg: move2.damage,
        uses: move2.uses,
        used: 0,
        special: move2.special,
        specialsUsed: 0
    };
    if (!move3) {
        this.m3 = false;
    }
    else {
        this.m3 = {
            name: move3.name,
            dmg: move3.damage,
            uses: move3.uses,
            used: 0
        };
    }
}

module.exports = {
    Conquest: Conquest
}