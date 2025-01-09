// Convierte un string o número en un booleano
export const convertToBoolean = (value) => {

    const trueValues = [ "true", "on", "yes", "1", 1, true ];
    return trueValues.includes(value);
};