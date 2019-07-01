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
 * @param {Number} p0.level - Current level of the card, for level-up/upgrading purposes... Level 1 by default.
 */
function Conquest({name, rating, type, desc, health, move1, move2, move3, bonusType, rarity, level}) {
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
    if (level) {
        this.level = level;
    }
    else {
        this.level = 1;
    }
    this.effects = false;
    this.health = health + (this.stars * 50) + (this.level * 10);
    this.m1 = {
        name: move1.name,
        dmg: move1.dmg + (this.level * 5),
        uses: move1.uses,
        used: 0
    };
    this.m2 = {
        name: move2.name,
        dmg: move2.dmg + (this.level * 5),
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
            dmg: move3.dmg + (this.level * 5),
            uses: move3.uses + (this.level),
            used: 0
        };
    }
    this.levelUp = function(lvl) {
        this.health -= this.level * 10;
        this.m1.dmg -= this.level * 5;
        this.m2.dmg -= this.level * 5;
        if (this.m3) this.m3.dmg -= this.level * 5;

        this.health += lvl * 10;
        this.m1.dmg += lvl * 5;
        this.m2.dmg += lvl * 5;
        if (this.m3) this.m3.dmg += lvl * 5;
    };
}


//Auxilium Potion Object

/**
 * 
 * @param {Object} p0
 * @param {String} p0.name - Name of the Auxilium Potion
 * @param {Number} p0.rating - The Auxilium Potion's power rating, used for star ranks
 * @param {String} p0.desc - Description of the Auxilium Potion
 * @param {Number} p0.healthIncrease - Increase in player's health (set to 0 if no increase should occur)
 * @param {Number} p0.damageDone - Damage done to the enemy (set to 0 if no damage should occur)
 * @param {"Poison" | "Disease" | "Bruises" | false} p0.effectsCleared - Special effects on the player to clear (set to false if no effect-clearing should occur)
 * @param {Number} p0.level - Starting level of the Auxilium Potion
 * 
 */
function Auxilium({name, rating, desc, healthIncrease, damageDone, effectsCleared, level}) {
    this.rating = rating;
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
    this.name = name;
    this.desc = desc;
    if (level) {
        this.level = level;
    }
    else {
        this.level = 1;
    }
    this.hp = healthIncrease + (this.level - 1) * 5;
    this.dmg = damageDone + (this.level - 1) * 5;
    this.ef = effectsCleared;
    this.special = false;
}



//Modum Auxilium Potion Object (Extends Auxilium)

/**
 * 
 * @param {Object} p0
 * @param {String} p0.name - Name of the Modum Auxilium Potion
 * @param {Number} p0.rating - The Modum Auxilium Potion's power rating, used for star ranks
 * @param {String} p0.desc - Description of the Modum Auxilium Potion
 * @param {Number} p0.healthIncrease - Increase in player's health (set to 0 if no increase should occur)
 * @param {Number} p0.damageDone - Damage done to the enemy (set to 0 if no damage should occur)
 * @param {"Poison" | "Disease" | "Bruises" | false} p0.effectsCleared - Special effects on the player to clear (set to false if no effect-clearing should occur)
 * @param {Number} p0.level - Starting level of the Modum Auxilium Potion
 * @param {"Poison" | "Disease" | "Bruises"} p0.specialEffect - Negative effect to place on the enemy
 * 
 */
function ModumAuxilium({name, rating, desc, healthIncrease, damageDone, effectsCleared, level, specialEffect}) {
    var basicAuxilium = new Auxilium({
        name: name,
        rating: rating,
        desc: desc,
        healthIncrease: healthIncrease,
        damageDone: damageDone,
        effectsCleared: effectsCleared,
        level: level
    });
    basicAuxilium.special = specialEffect;
    this.name = basicAuxilium.name;
    this.rating = basicAuxilium.rating;
    this.desc = basicAuxilium.desc;
    this.hp = basicAuxilium.hp;
    this.dmg = basicAuxilium.dmg;
    this.ef = basicAuxilium.ef;
    this.level = basicAuxilium.level;
    this.special = basicAuxilium.special;
}

/**
 * 
 * @param {Object} p0
 * @param {Array} p0.zones - Zone Sectors contained in the Area in order
 * @param {Array} p0.auras - Auras (special effects on the player based on zone) in the Area in order of zones
 * @param {Array} p0.aids - Auras (special effects based on zone) placed on Enemies in the Area in order of zones
 * 
 */
function Area({zones, auras, aids}) {
    this.zones = zones;
    this.auras = auras;
    this.aids = aids;
}

module.exports = {
    Conquest: Conquest,
    Auxilium: Auxilium,
    Modum: ModumAuxilium,
    Area: Area
}