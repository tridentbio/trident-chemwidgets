
const atomicDict: {[key: string]: string} = {
    "1": 'Hydrogen',
    "2": 'Carbon',
    "7": 'Nitrogen',
    "8": 'Oxygen'
}

export const atomicNumberToName = (value: any): string => {
    return atomicDict[`${value}`];
}