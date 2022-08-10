const LANGUAGE_ENG = 'eng';
const LANGUAGE_PL = 'pl';

const splitIdioms = (array) => {
    const splittedArray = [];
    
    array.forEach(idiom => {
        if (idiom.guessed) return;

        splittedArray.push({
            id: idiom.id,
            content: idiom.eng,
            language: LANGUAGE_ENG,
            guessed: idiom.guessed
        });

        splittedArray.push({
            id: idiom.id,
            content: idiom.pl,
            language: LANGUAGE_PL,
            guessed: idiom.guessed
        });
    });

    return splittedArray;
}

export default splitIdioms;