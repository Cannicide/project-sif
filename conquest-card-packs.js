//Import Conquest of Cards Card Object
var ConquestOfCards = require("./conquest-card-obj");
var Conquest = ConquestOfCards.Conquest;
var Auxilium = ConquestOfCards.Auxilium;
var Modum = ConquestOfCards.Modum;
var Area = ConquestOfCards.Area;

/* 
    The card packs defined and entirely written within this file
    are the default card packs of Conquest of Cards. Other card
    packs, such as those created by external developers, will be
    imported to this file. However, they will not be defined nor
    created within this file. The default card packs will only
    account for the 9 sector themes, each theme's heroes/villains,
    and various single-character evolution packs.

    Additional cards, including official cards that are not included
    in the default card packs, will be imported below and stored in
    the conquest-packs folder.
*/

//---------------------------------Card Packs------------------------------\\

//Import External Card Packs (Non-Default):

// No external card packs, yet \\



//Default Card Pack:

var defaultCards = {
    Venigland: new Conquest({
        name: "Venigland",
        rating: 43,
        type: "Stellar",
        desc: "A parasitical life form found in the Octarean Sector, known to locate and absorb powerless, skilled fighters.",
        health: 35,
        move1: {
            name: "Leech",
            dmg: 5,
            uses: 15
        },
        move2: {
            name: "Venomous Infliction",
            dmg: 15,
            uses: 2,
            special: "Poison"
        },
        move3: false,
        bonusType: "Skilled",
        rarity: 0
    }),

    Octaeus: new Conquest({
        name: "Lord Octaeus",
        rating: 59,
        type: "Stellar",
        desc: "King and Supreme Ruler of the Octarean Sector, promoting anarchy while still exerting control over its inhabitants.",
        health: 30,
        move1: {
            name: "Executive Order",
            dmg: 5,
            uses: 15
        },
        move2: {
            name: "Biochemical Research",
            dmg: 20,
            uses: 1,
            special: "*Biochemical Accumulation"
        },
        move3: {
            name: "Nine Commandments",
            dmg: 9,
            uses: 9
        },
        bonusType: "Genetic",
        rarity: 1
    }),

    Archaeus: new Conquest({
        name: "Archaeus Tetheros",
        rating: 35,
        type: "Skilled",
        desc: "Hero of the Genevan Sector, Archaeus found himself mystically summoned to the Octarean Sector by the vile sorcerer Exeon V. Trapped in a foreign galaxy, Archaeus strives to become a hero to the civilians of Octarean.",
        health: 35,
        move1: {
            name: "Terran Shotgun",
            dmg: 5,
            uses: 10
        },
        move2: {
            name: "One Punch",
            dmg: 25,
            uses: 1,
            special: "Bruises"
        },
        move3: false,
        bonusType: "Mystic",
        rarity: 0
    }),

    Overkill: new Conquest({
        name: "Overkill",
        rating: 100,
        type: "Tech",
        desc: "19-year-old Joshua Rex designed a tech suit that could end crime throughout the Genevan world known as Terra, or Earth; he decided to use it to become a mercenary, instead.",
        health: 70,
        move1: {
            name: "Fusion Blasters",
            dmg: 10,
            uses: 30
        },
        move2: {
            name: "Radiative Fission Core Expulsion",
            dmg: 50,
            uses: 1,
            special: "Disease"
        },
        move3: false,
        bonusType: "Genetic",
        rarity: 1
    }),

    Prime: new Conquest({
        name: "Prime The Conqueror",
        rating: 110,
        type: "Tech",
        desc: "Conqueror of 729,000 planets, Prime crushes opponents in his path with superior technology and unnecessarily rough force.",
        health: 250,
        move1: {
            name: "Brutal Genocide",
            dmg: 10,
            uses: 350
        },
        move2: {
            name: "Automatic Disownment",
            dmg: 50,
            uses: 2,
            special: "None"
        },
        move3: false,
        bonusType: "Mystic",
        rarity: 1
    })
}

//Octarean Expansion Pack 1:

var octareanExpansion1 = {
    Venigland: new Conquest({
        name: "Venigland",
        rating: 212,
        type: "Stellar",
        desc: "A parasitical life form found in the Octarean Sector, known to locate and absorb powerless, skilled fighters.",
        health: 350,
        move1: {
            name: "Hyper-Leech",
            dmg: 30,
            uses: 15
        },
        move2: {
            name: "Enhanced Absorption",
            dmg: 150,
            uses: 2,
            special: "*Reflection"
        },
        move3: false,
        bonusType: "Skilled",
        rarity: 1
    }),

    Octaeus: new Conquest({
        name: "Lord Octaeus",
        rating: 232,
        type: "Stellar",
        desc: "King and Supreme Ruler of the Octarean Sector, promoting anarchy while still exerting control over its inhabitants.",
        health: 310,
        move1: {
            name: "Chaotic Massacre",
            dmg: 50,
            uses: 15
        },
        move2: {
            name: "Tier-2 Biochemical Research",
            dmg: 0,
            uses: 10,
            special: "*Biochemical Accumulation"
        },
        move3: {
            name: "{2}Biochemical Warfare",
            dmg: 70,
            uses: 10
        },
        bonusType: "Genetic",
        rarity: 2
    }),

    Archaeus: new Conquest({
        name: "Archaeus Tetheros",
        rating: 350,
        type: "Skilled",
        desc: "Hero of the Genevan Sector, Archaeus found himself mystically summoned to the Octarean Sector by the vile sorcerer Exeon V. Trapped in a foreign galaxy, Archaeus strives to become a hero to the civilians of Octarean.",
        health: 560,
        move1: {
            name: "Terran Shurikens",
            dmg: 15,
            uses: 100
        },
        move2: {
            name: "Carcinogenic Blades",
            dmg: 75,
            uses: 10,
            special: "Disease"
        },
        move3: {
            name: "Terran Meme-Distraction",
            dmg: 175,
            uses: 1
        },
        bonusType: "Mystic",
        rarity: 2
    })


}

//Evolved Archaeus Pack:

var evolvedArchaeus = {
    Archaeus: new Conquest({
        name: "Archaeus Tetheros",
        rating: 350,
        type: "Skilled",
        desc: "Hero of the Genevan Sector, Archaeus found himself mystically summoned to the Octarean Sector by the vile sorcerer Exeon V. Trapped in a foreign galaxy, Archaeus strives to become a hero to the civilians of Octarean.",
        health: 560,
        move1: {
            name: "Terran Shurikens",
            dmg: 15,
            uses: 100
        },
        move2: {
            name: "Carcinogenic Blades",
            dmg: 75,
            uses: 10,
            special: "Disease"
        },
        move3: {
            name: "Terran Meme-Distraction",
            dmg: 175,
            uses: 1
        },
        bonusType: "Mystic",
        rarity: 2,
        level: 2
    }),

    EnhancedArchaeus: new Conquest({
        name: "Enhanced Archaeus Tetheros",
        rating: 400,
        type: "Chemical",
        desc: "Hero of the Genevan Sector, Archaeus found himself mystically summoned to the Octarean Sector by the vile sorcerer Exeon V. Trapped in a foreign galaxy, Archaeus strives to become a hero to the civilians of Octarean. In this variant version, Archaeus is captured and injected with Bioweapon X, infusing him with enhanced powers.",
        health: 650,
        move1: {
            name: "Light-speed Fists",
            dmg: 45,
            uses: 10
        },
        move2: {
            name: "Bioweapon X",
            dmg: 450,
            uses: 1,
            special: "Poison"
        },
        move3: {
            name: "Endurance",
            dmg: 15,
            uses: 1000
        },
        bonusType: "Mystic",
        rarity: 3,
        level: 2
    }),

    WizardlyArchaeus: new Conquest({
        name: "Wizardly Archaeus Tetheros",
        rating: 450,
        type: "Mystic",
        desc: "Hero of the Genevan Sector, Archaeus found himself mystically summoned to the Octarean Sector by the vile sorcerer Exeon V. Trapped in a foreign galaxy, Archaeus strives to become a hero to the civilians of Octarean. In this variant version, Archaeus defeats Exeon V and uses his powers to do good in the Octarean Sector.",
        health: 700,
        move1: {
            name: "Spell of Tartarus",
            dmg: 200,
            uses: 1
        },
        move2: {
            name: "Spell of Unlimited Disease",
            dmg: 25,
            uses: 40,
            special: "Disease"
        },
        move3: {
            name: "Terran Blood Cult",
            dmg: 150,
            uses: 1
        },
        bonusType: "Stellar",
        rarity: 4,
        level: 2
    }),

    EvolvedArchaeus: new Conquest({
        name: "Evolved Archaeus Tetheros",
        rating: 580,
        type: "*Evolved Stellar",
        desc: "Hero of the Genevan Sector, Archaeus found himself mystically summoned to the Octarean Sector by the vile sorcerer Exeon V. Trapped in a foreign galaxy, Archaeus strives to become a hero to the civilians of Octarean. In this variant version, Archaeus symbiotically bonds with the parasite Venigland, becoming the most powerful being in the galaxy.",
        health: 950,
        move1: {
            name: "Absorption",
            dmg: 500,
            uses: 1
        },
        move2: {
            name: "Symbiote Rejuvenation",
            dmg: 0,
            uses: 2000,
            special: "*Evolved Regeneration"
        },
        move3: {
            name: "Unstoppable",
            dmg: 100,
            uses: 9
        },
        bonusType: "Stellar",
        rarity: 7,
        level: 5
    })
}

//Villains Packs:

var octareanVillains = {
    ExeonV: new Conquest({
        name: "Exeon V",
        rating: 240,
        type: "Mystic",
        desc: "Vile sorcerer who uses the mystic arts for evil, Exeon V mystically abducted Archaeus Tetheros into the Octarean Sector. This proved to be a mistake; Archaeus and Exeon became arch-nemeses, and an epic hero versus villain conflict ensues.",
        health: 850,
        move1: {
            name: "Simple Kick",
            dmg: 5,
            uses: 1000
        },
        move2: {
            name: "Mystical Abduction",
            dmg: 10,
            uses: 75,
            special: "Bruises"
        },
        move3: false,
        bonusType: "Skilled",
        rarity: 1
    }),

    Pontius: new Conquest({
        name: "Pontius P. Pancreatos",
        rating: 200,
        type: "Tech",
        desc: "As the former apprentice of Exeon V, Pontius suffered from endless pain caused by his conscience. With the power of emotion-suppressing tech, Pontius now watches and assists his master in committing mass murder in the Octarean Sector.",
        health: 800,
        move1: {
            name: "Simple Punch",
            dmg: 2,
            uses: 1000
        },
        move2: {
            name: "Lack of Conscience",
            dmg: 30,
            uses: 1,
            special: "None"
        },
        move3: false,
        bonusType: "Skilled",
        rarity: 1
    }),

    Scelestus: new Conquest({
        name: "Scelestus Domitor",
        rating: 720,
        type: "Genetic",
        desc: "Scelestus Domitor is a member of the genetically advanced race known as the Deus Infinitus, a race of alien conquerors who hold god-like power. Scelestus is surrounded in an aura of death, misery, and destruction.",
        health: 1450,
        move1: {
            name: "Celestial Immortuos",
            dmg: 250,
            uses: 10
        },
        move2: {
            name: "Soul Consumption",
            dmg: 110,
            uses: 25,
            special: "*Evolved Regeneration"
        },
        move3: {
            name: "*Dexterity Regeneration", //Regenerates the "uses" of each move except move3
            dmg: 0,
            uses: 3
        },
        bonusType: "Skilled",
        rarity: 7.8
    }),

    EvolvedScelestus: new Conquest({
        name: "Evolved Scelestus Domitor",
        rating: 720,
        type: "*Evolved Genetic",
        desc: "Scelestus Domitor is a member of the genetically advanced race known as the Deus Infinitus, a race of alien conquerors who hold god-like power. Scelestus is surrounded in an aura of death, misery, and destruction. In this variant, the Deus Infinitus uses genetic manipulation to evolve beyond their usual limits. Scelestus is the first to undergo this therapy, and upon success, he executes the rest of his species.",
        health: 1450,
        move1: {
            name: "Celestial Immortuos",
            dmg: 350,
            uses: 15
        },
        move2: {
            name: "Cannicidal Consumption",
            dmg: 1100,
            uses: 1,
            special: "*Cannicidal Regeneration"
        },
        move3: {
            name: "*Dexterity Regeneration", //Regenerates the "uses" of each move except move3
            dmg: 0,
            uses: 15
        },
        bonusType: "Skilled",
        rarity: 7.8,
        level: 6
    })
}

//----------------------Auxilium Packs----------------------\\

//Default Auxilium Pack:

var defaultAuxilium = {
    healthPot: new Auxilium({
        name: "Elixir of Life",
        rating: 100,
        desc: "Basic health Auxilium potion that grants additional HP.",
        healthIncrease: 10,
        damageDone: 0,
        effectsCleared: false,
        level: 1
    }),

    diseasePot: new Modum({
        name: "Modum of Disease",
        rating: 250,
        desc: "Basic disease Modum Auxilium potion that inflicts disease on the enemy.",
        healthIncrease: 0,
        damageDone: 5,
        effectsCleared: false,
        level: 1,
        specialEffect: "Disease"
    }),

    malusPot: new Auxilium({
        name: "Malus Auxilium",
        rating: 150,
        desc: "Basic damaging Auxilium potion that inflicts damage on the enemy.",
        healthIncrease: 0,
        damageDone: 15,
        effectsCleared: false,
        level: 1
    })
}

//----------------------Game Areas----------------------\\

//Sector 8:
var OctareanSector = new Area({
    zones: ["The Fields", "Harsh Desert", "Isles of Ignition", "Plains of Prosperity", "Exeon Fortress"],
    auras: [false, false, "Bruises", "*Regeneration", false],
    aids: [false, false, false, "*Regeneration", "*Regeneration"]
});

//Sector 1:
var GenevanSector = new Area({
    zones: ["Streets of Athens", "The Sahara", "Las Vegas", "Pacific Depths", "Interdimensional Mars Outpost (IMO)"],
    auras: [false, "Bruises", "Poison", "*Suffocation", false],
    aids: [false, false, "Poison", false, "*Regeneration"]
});

//Sector 2:
var DeuteranSector = new Area({
    zones: ["Andromeda Space Station", "Buttler Avenue", "Halls of the Hind", "Bottomful Pit", "Methane Mansion"],
    auras: [false, false, false, false, "Disease"],
    aids: ["*Regeneration", "*Regeneration", "*Regeneration", false, "Disease"]
});

//Sector 3:
var TrinitianSector = new Area({
    zones: ["Trifactium Warehouse", "Trifactium Factory", "Trifactium T.O.W.E.R."],
    auras: ["Poison", "Disease", "*5Kill"], //*5Kill has a 50% chance to kill inflicted characters after being affected for 5 turns
    aids: ["*Regeneration", "Disease", "*5Kill"]
});


//Export Cards:

module.exports = {
    //Cards:
    default: defaultCards,
    octExp: {
        I: octareanExpansion1
    },
    evolvedArchaeus: evolvedArchaeus,
    villains: {
        octarean: octareanVillains
    },
    //Auxilium/Modum Auxilium Potions:
    auxilium: {
        default: defaultAuxilium
    },
    //Sectors of the Universe:
    sectors: {
        genevan: GenevanSector,
        deuteran: DeuteranSector,
        trinitian: TrinitianSector,
        octarean: OctareanSector
    }
}