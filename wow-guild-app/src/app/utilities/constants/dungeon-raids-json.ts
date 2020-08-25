
export const dungeons = function() {
    const boe = 'Binds when equipped';
    const bop = 'Binds when picked up';
    const reqLvl = 'Requires Level';
    const sets = {
        wcSet: 'Embrace of the Viper (0/5) \n Belt of the Fang \n Footpads of the Fang' + 
        '\n Gloves of the Fang \n Leggings of the Fang \n Armor of the Fang' +
        '\n (2) Set: Increases damage done by Nature spells and effects by up to 7.' +
        '\n (3) Set: Increased Staves +2.' +
        '\n (4) Set: Increases healing done by spells and effects by up to 11.' +
        '\n (5) Set: + 10 Intellect.'

    }

    const armorType = {
        cloth: 'Cloth',
        leather: 'Leather',
        mail: 'Mail',
        plate: 'Plate'
    }

    const weaponType = {
        sword: 'Sword',
        dagger: 'Dagger',
        staff: 'Staff',
        axe: 'Axe',
        polearm: 'Polearm',
        mace: 'Mace',
        gun: 'Gun',
        bow: 'Bow',
        crossbow: 'Crossbow',
        shield: 'Shield'
    }

    const armorSlot = {
        head: 'Head',
        neck: 'Neck',
        shoulder: 'Shoulder',
        back: 'Back',
        chest: 'Chest',
        shirt: 'Shirt',
        tabard: 'Tabard',
        wrist: 'Wrist',
        hands: 'Hands',
        waist: 'Waist',
        legs: 'Legs',
        feet: 'Feet',
        finger: 'Finger',
        trinket: 'Trinket'
    }

    const weaponSlot = {
        mh: 'Main Hand',
        oh: 'One Hand',
        ofh: 'Off Hand',
        th: 'Two Hands',
        range: 'Ranged'
    }
    const attributes = {
        strength: 'Strength',
        agility: 'Agility',
        stamina: 'Stamina',
        intellect: 'Intellect',
        spirit: 'Spirit',
        armor: 'Armor'
    }

    return (
        {
            'Ragefire Chasm (13 - 18)': {
                'Taragaman the Hungerer': {
                    'Subterranean Cape': {
                        1: bop,
                        2: armorSlot.back,
                        3: `16 ${attributes.armor}`,
                        4: `2 ${attributes.strength}`,
                        5: `4 ${attributes.agility}`,
                        6: reqLvl + '13',
                        7: 'Droprate: 34.74%',
                        color: 'green'
                    },
                    'Crystalline Cuffs': {
                        1: bop,
                        2: armorType.cloth,
                        3: armorSlot.wrist,
                        4: `14 ${attributes.armor}`,
                        5: `1 ${attributes.intellect}`,
                        6: `2 ${attributes.spirit}`,
                        7: reqLvl + '13',
                        8: 'Droprate: 32.91%',
                        color: 'green'
                    },
                    'Cursed Felblade': {
                        1: bop,
                        2: weaponType.sword,
                        3: weaponSlot.mh,
                        4: '16-31 Damage',
                        5: '(9.0 damage per second)',
                        6: 'Speed 2.60',
                        7:  reqLvl + '13',
                        8: "Chance on hit: Reduces target enemy's attack power by 15 for 30sec.",
                        9: 'Droprate: 17.8%',
                        color: 'green'
                    }
                },
                'Jergosh the Invoker': {
                    'Robe of Evocation': {
                        1: bop,
                        2: armorType.cloth,
                        3: armorSlot.chest,
                        4: `32 ${attributes.armor}`,
                        5: `4 ${attributes.intellect}`,
                        6: `3 ${attributes.stamina}`,
                        7: reqLvl + '13',
                        8: 'Droprate: 36.42%',
                        color: 'green'
                    },
                    'Cavedweller Bracers': {
                        1: bop,
                        2: armorType.mail,
                        3: armorSlot.wrist,
                        4: `71 ${attributes.armor}`,
                        5: `1 ${attributes.strength}`,
                        6: `2 ${attributes.stamina}`,
                        7: reqLvl + '13',
                        8: 'Droprate: 37.28%'
                    },
                    'Chanting Blade': {
                        1: bop,
                        2: weaponType.dagger,
                        3: weaponSlot.oh,
                        4: '9-18 damage',
                        5: '(9.0 damage per second)',
                        6: 'Speed 1.50',
                        7: `1 ${attributes.agility}`,
                        8: `1 ${attributes.stamina}`,
                        9: reqLvl + '13',
                        10: 'Droprate: 18.17%',
                        color: 'green'
                    }
                }
            },
            'Wailing Caverns (17 - 24)': {
                'Lord Cobrahn': {
                    "Cobrahn's Grasp": {
                        1: bop,
                        2: armorType.mail,
                        3: armorSlot.waist,
                        4: `111 ${attributes.armor}`,
                        5: `8 ${attributes.strength}`,
                        6: `3 ${attributes.agility}`,
                        7: reqLvl + '19',
                        8: 'Droprate: 18.13%',
                        color: 'blue'
                    },
                    'Leggings of the Fang': {
                        1: bop,
                        2: armorType.leather,
                        3: armorSlot.legs,
                        4: `79 ${attributes.armor}`,
                        5: `5 ${attributes.strength}`,
                        6: `6 ${attributes.agility}`,
                        7: `4 ${attributes.stamina}`,
                        8: reqLvl + '18',
                        9: sets.wcSet,
                        10: 'Droprate: 16.68%',
                        color: 'blue'
                    },
                    'Robe of the Moccasin': {
                        1: bop,
                        2: armorType.cloth,
                        3: armorSlot.chest,
                        4: `36 ${attributes.armor}`,
                        5: `2 ${attributes.strength}`,
                        6: `2 ${attributes.stamina}`,
                        7: `6 ${attributes.spirit}`,
                        8: reqLvl + '17',
                        9: 'Droprate: 55.32%',
                        color: 'green'
                    }
                },
                'Lady Anacondra': {
                    'Belt of the Fang': {
                        1: bop,
                        2: armorType.leather,
                        3: armorSlot.waist,
                        4: `45 ${attributes.armor}`,
                        5: `2 ${attributes.agility}`,
                        6: `3 ${attributes.stamina}`,
                        7: reqLvl + '16',
                        8: sets.wcSet,
                        9: 'Droprate: 9.64%',
                        color: 'green'
                    },
                    "Serpent's Shoulders": {
                        1: bop,
                        2: armorType.leather,
                        3: armorSlot.shoulder,
                        4: `59 ${attributes.armor}`,
                        5: reqLvl + '18',
                        6: 'Droprate: 43.03%',
                        color: 'white'
                    },
                    'Snakeskin Bag': {
                        1: 'Unique',
                        2: '10 Slot Bag',
                        3: 'Droprate: 4.76%',
                    }
                },
                'Kresh': {
                    "Kresh's Back": {
                        1: bop,
                        2: weaponType.shield,
                        3: weaponSlot.ofh,
                        4: `471 ${attributes.armor}`,
                        5: `9 Block`,
                        6: reqLvl + '15',
                        7: 'Equip: Increased Defense +4.',
                        8: 'Droprate: 13.67%',
                        color: 'blue'
                    },
                    "Worn Turtle Shell Shield": {
                        1: bop,
                        2: weaponType.shield,
                        3: weaponSlot.ofh,
                        4: `412 ${attributes.armor}`,
                        5: `6 Block`,
                        6: reqLvl + '15',
                        7: 'Droprate: 66.3%',
                        color: 'white'
                    }
                },
                "Lord Pythas": {
                    'Stinging Viper': {
                        1: bop,
                        2: weaponType.mace,
                        3: weaponSlot.oh,
                        4: '30 - 57 damage',
                        5: '(15.5 damage per second)',
                        6: 'Speed 2.80',
                        7: reqLvl + '19',
                        8: 'Chance on hit: Poisons the target for 7 Nature damage every 3 sec for 15sec.',
                        9: 'Droprate: 29.86%',
                        color: 'blue'
                    },
                    'Armor of the Fang': {
                        1: bop,
                        2: armorType.leather,
                        3: armorSlot.chest,
                        4: `82 ${attributes.armor}`,
                        5: `2 ${attributes.strength}`,
                        6: `7 ${attributes.spirit}`,
                        7: reqLvl + '18',
                        8: sets.wcSet,
                        9: 'Droprate: 55.7%',
                        color: 'green'
                    }
                },
                'Skum': {
                    'Glowing Lizardscale Cloak': {
                        1: bop,
                        2: armorSlot.back,
                        3: `20 ${attributes.armor}`,
                        4: `6 ${attributes.agility}`,
                        5: `2 ${attributes.spirit}`,
                        6: reqLvl + '17',
                        7: 'Droprate: 45.62%',
                        color: 'blue'
                    },
                    'Tail Spike': {
                        1: bop,
                        2: weaponType.dagger,
                        3: weaponSlot.oh,
                        4: '14 - 26 damage',
                        5: '(11.1 damage per second)',
                        6: 'Speed 1.80',
                        7: `2 ${attributes.strength}`,
                        8: `2 ${attributes.agility}`,
                        9: reqLvl + '17',
                        10: 'Droprate: 46.46%',
                        color: 'green'
                    }
                },
                'Lord Serpentis': {
                   'Venomstrike': {
                        1: bop,
                        2: weaponType.bow,
                        3: weaponSlot.range,
                        4: '16 - 30 damage',
                        5: '(9.6 damage per second)',
                        6: 'Speed 2.40',
                        7: reqLvl + '19',
                        8: 'Equip: Chance to strike your ranged target with a Venom Shot for 31 to 45 Nature damage.',
                        9: 'Droprate: 16.94%',
                        color: 'blue'
                   },
                   'Serpent Gloves': {
                        1: bop,
                        2: armorType.cloth,
                        3: armorSlot.hands,
                        4: `23 ${attributes.armor}`,
                        5: `4 ${attributes.agility}`,
                        6: `4 ${attributes.intellect}`,
                        7: reqLvl + '18',
                        8: 'Droprate: 19.43%',
                        color: 'green' 
                   },
                   'Foodpads of the Fang': {
                        1: bop,
                        2: armorType.leather,
                        3: armorSlot.feet,
                        4: `57 ${attributes.armor}`,
                        5: `4 ${attributes.agility}`,
                        6: `4 ${attributes.stamina}`,
                        7: reqLvl + '18',
                        8: sets.wcSet,
                        9: 'Droprate: 20.83%',
                        color: 'green'
                   },
                   'Savage Trodders': {
                        1: bop,
                        2: armorType.mail,
                        3: armorSlot.feet,
                        4: `122 ${attributes.armor}`,
                        5: `6 ${attributes.stamina}`,
                        6: reqLvl + '18',
                        7: 'Droprate: 23.59%',
                        color: 'green'
                   }
                },
                'Verdan the Everliving': {
                    'Seedcloud Buckler': {
                        1: bop,
                        2: weaponType.shield,
                        3: weaponSlot.ofh,
                        4: `566 ${attributes.armor}`,
                        5: `11 Block`,
                        6: `6 ${attributes.intellect}`,
                        7: `3 ${attributes.spirit}`,
                        8: reqLvl + '20',
                        9: 'Droprate: 39.12%',
                        color: 'blue'
                    },
                    'Living Root': {
                        1: bop,
                        2: weaponType.staff,
                        3: weaponSlot.th,
                        4: '49 - 74 damage',
                        5: '(21.2 damage per second)',
                        6: 'Speed 2.90',
                        7: `2 ${attributes.stamina}`,
                        8: `12 ${attributes.spirit}`,
                        9: '5 Nature Resistance',
                        10: reqLvl + '20',
                        11: 'Droprate: 16.94%',
                        color: 'blue'
                    },
                    'Scorpid Cape': {
                        1: bop,
                        2: armorSlot.back,
                        3: `18 ${attributes.armor}`,
                        4: `3 ${attributes.stamina}`,
                        5: `2 ${attributes.spirit}`,
                        6: reqLvl + '18',
                        7: 'Droprate: 19.68%',
                        color: 'green'
                    }
                },
                'Mutanus the Devourer': {
                    'Slime Encrusted Pads': {
                        1: bop,
                        2: armorType.cloth,
                        3: armorSlot.shoulder,
                        4: `34 ${attributes.armor}`,
                        5: reqLvl + '22',
                        6: 'Equip: Restores 3health every 4 sec.',
                        7: 'Droprate: 29.89%',
                        color: 'blue'
                    },
                    'Mutant Scale Breastplate': {
                        1: bop,
                        2: armorType.mail,
                        3: armorSlot.chest,
                        4: `211 ${attributes.armor}`,
                        5: `13 ${attributes.strength}`,
                        6: `5 ${attributes.stamina}`,
                        7: reqLvl + '23',
                        8: 'Droprate: 22.75%',
                        color: 'blue'
                    },
                    'Deep Fanthom Ring': {
                        1: bop,
                        2: 'Unique',
                        3: armorSlot.finger,
                        4: `3 ${attributes.intellect}`,
                        5: `3 ${attributes.stamina}`,
                        6: `6 ${attributes.spirit}`,
                        7: reqLvl + '21',
                        8: 'Droprate: 30.58%',
                        color: 'blue'
                    }
                },
                trash: {
                    'Gloves of the Fang': {
                        1: boe,
                        2: armorType.leather,
                        3: armorSlot.hands,
                        4: `47 ${attributes.armor}`,
                        5: `2 ${attributes.strength}`,
                        6: `3 ${attributes.agility}`,
                        7: reqLvl + '14',
                        8: sets.wcSet,
                        9: 'Droprate: 2.46%',
                        color: 'green'
                    }
                }
            },
            // 'The Deadmines (17 - 26)': {
                
            // }
        }
    )
    
}