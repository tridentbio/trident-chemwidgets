export interface Point0D {
    smiles: string,
    index?: number
}

export interface Point1D {
    smiles: string,
    x: number,
    y?: number,
    index?: number
}

export interface Point2D {
    smiles: string,
    x: number,
    y: number,
    index?: number
}

export interface DataObject1D {
    points: Point1D[]
}

export interface DataObject2D {
    points: Point2D[]
}