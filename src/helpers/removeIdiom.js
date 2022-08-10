const removeIdiom = (array, id) => {
    const newArray = array.map(idiom => {
        if (idiom.id !== id) return idiom;

        return {
            ...idiom,
            guessed: true
        }
    });

    // const newArray = array.filter(idiom => (idiom.id !== id));

    return newArray;
}

export default removeIdiom;