import { Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Point0D, Point1D, Point2D } from "../../types/dataTypes";
import MoleculeDrawing from "./MoleculeDrawing";

const dividePages = (elementsNumber: number, pageSize: number) => {
    let numPages = Math.ceil(elementsNumber / pageSize);
    if (isNaN(numPages)) {
        numPages = 0;
    }
    return numPages;
}

interface MoleculeGridProps {
    data: any,
    height?: string,
}

const MoleculeGrid = (props: MoleculeGridProps) => {

    if (!props.height) {
        props.height = '100%';
    }

    return (props.data.length > 0) ? (
        <Grid container display='flex' alignItems='center' justifyContent='space-around' sx={{ height: props.height, width: '100%'}}>
            {props.data.map((element: any) => (
                <Grid item xs={12} sm={6} display='flex' justifyContent='center' md={4} key={`mol${element.index}_grid`} >
                    <MoleculeDrawing smiles={element.smiles}
                        width={150} height={100} />
                </Grid>
            ))}
        </Grid>
    ) : (<Grid sx={{ height: props.height }} />);
};

interface MoleculeGalleryProps {
    selected: (Point0D[] | Point1D[] | Point2D[]),
}

interface MoleculeGalleryState {
    displayData: (Point0D[] | Point1D[] | Point2D[]),
    page: number,
    pageCount: number
}

const getDataWithIndex = (data: (Point0D[] | Point1D[] | Point2D[]), start: number, stop: number) => {
    const displayData = data.slice(start, stop);
    for (let i = start; i < stop; i++) {
        displayData[i - start].index = i;
    }
    return displayData;
};

const MoleculeGallery = (props: MoleculeGalleryProps): JSX.Element => {

    const [state, setState] = useState<MoleculeGalleryState>({
        displayData: getDataWithIndex(props.selected, 0, Math.min(props.selected.length, 9)),
        page: 1,
        pageCount: dividePages(props.selected.length, 9)
    });

    const handleChange = (e: React.ChangeEvent<unknown>, p: number) => {
        setState({
            ...state,
            page: p,
            displayData: getDataWithIndex(
                props.selected,
                (p - 1) * 9,
                Math.min(props.selected.length, p * 9),
            ),
            pageCount: dividePages(props.selected.length, 9)
        });
    }

    useEffect(() => {
        // const p = state.page;
        const p = 1;
        setState({
            ...state,
            page: p,
            displayData: getDataWithIndex(
                props.selected,
                (p - 1) * 9,
                Math.min(props.selected.length, p * 9)
            ),
            pageCount: dividePages(props.selected.length, 9)
        });
    }, [props.selected]);

    return (
        <Grid container rowSpacing={2} alignItems='center' justifyContent='center'>
            <Grid item xs={12}>
                <MoleculeGrid data={state.displayData} height='90%'/>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='center'>
                <Pagination
                    count={state.pageCount}
                    page={state.page}
                    onChange={handleChange}
                    hideNextButton={state.pageCount == 0}
                    hidePrevButton={state.pageCount == 0}
                    sx={{ height: '10%' }}
                />
            </Grid>
        </Grid>
    )
};

export default MoleculeGallery;