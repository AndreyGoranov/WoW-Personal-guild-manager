export const detectFraction = function(race: string): string {
    let horde = ['Undead', 'Orc', 'Troll', 'Tauren', 'Blood elf'];
    if (horde.includes(race)) {
        return 'Horde'
    } else {
        return 'Aliance'
    }
}