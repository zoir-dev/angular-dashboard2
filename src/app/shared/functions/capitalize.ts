export function capitalizeWord(str:string='') {
    return str.replace(/\b(\w+)(\s+)?(\w+)?\b/g, function(match, firstWord, space, secondWord) {
        if (!space && !secondWord) { // if only one word
            return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
        } else { // if two words
            return firstWord.charAt(0).toUpperCase() + firstWord.slice(1) + (space || '') + (secondWord.charAt(0).toUpperCase() + secondWord.slice(1) || '');
        }
    });
}
export function capitalizeLetter(str:string='') {
    return str.replace(/\b(\w+)(\s+)?(\w+)?\b/g, function(match, firstWord, space, secondWord) {
        if (!space && !secondWord) { // if only one word
            return firstWord.charAt(0).toUpperCase()
        } else { // if two words
            return firstWord.charAt(0).toUpperCase() + secondWord.charAt(0).toUpperCase()
        }
    });
}
