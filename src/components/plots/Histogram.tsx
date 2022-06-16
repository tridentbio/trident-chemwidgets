import { Vega, VisualizationSpec } from 'react-vega';
import { DataObject1D, Point1D } from '../../types/dataTypes';
import histogramSpec from '../specs/histogram_specs';
import React, { useEffect, useState } from 'react';
import { Button, Grid, ThemeProvider } from '@mui/material';
import theme from '../../theme';
import Logo from '../../utils/logo';
import initRDKit from '../../utils/rdkit';
import MoleculeGallery from '../drawings/MoleculeGallery';

interface HistogramProps {
    data: DataObject1D,
    onChange?: (val: (number | undefined)[]) => void,
    xLabel?: string,
    xIsDate?: boolean,
    xDateFormat?: string,
}

interface HistogramState {
    data: DataObject1D,
    spec: VisualizationSpec,
    xlim: [number, number],
    selected: Point1D[],
    savedSelected: Point1D[],
}

const Histogram = (props: HistogramProps): JSX.Element => {

    // const xIsDate = props.xIsDate ? props.xIsDate : false;
    // const xDateFormat = props.xDateFormat ? props.xDateFormat : '';
    // const xLabel = props.xLabel ? props.xLabel : '';

    const [state, setState] = useState<HistogramState>({
        data: props.data,
        spec: histogramSpec(400, 400, props.xLabel, props.xIsDate, props.xDateFormat),
        xlim: [NaN, NaN],
        selected: [],
        savedSelected: [],
    });

    const filterInterval = (
        data: Point1D[],
        xMin: number | Date,
        xMax: number | Date
    ) => {

        xMin = props.xIsDate ? new Date(xMin) : xMin;
        xMax = props.xIsDate ? new Date(xMax) : xMax;

        const filteredData = data.filter(datum => {
            const datumX = props.xIsDate ? new Date(datum.x) : datum.x;
            return (datumX >= xMin) && (datumX <= xMax);
        });
        return filteredData;
    }

    const handleSelect = (...args: any) => {
        let limits = args[1];
        if (Object.keys(limits).length !== 0) {
            let xlim = args[1]['x'];
            setState({
                ...state,
                xlim: xlim,
            });
        } else {
            setState({
                ...state,
                xlim: [NaN, NaN],
                selected: [],
            });
        }
    }

    const handleFilterClick = () => {
        const selected = filterInterval(state.data.points, ...state.xlim);
        setState({...state, selected: selected});
    };

    const handleSaveSelection = () => {
        const selected = filterInterval(state.data.points, ...state.xlim);
        
        setState({
            ...state,
            selected: selected,
            savedSelected: selected
        });

        if (props.onChange) {
            props.onChange(selected.map((element: Point1D) => { return element.index }))
        }
    }

    useEffect(() => {
        if (!(window as any).RDKit) {
            initRDKit();
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={2}>
                <Grid item md={6} justifyContent='center'>
                    <Grid container rowSpacing={2}>
                        <Grid item md={12} display='flex' justifyContent='center'>
                            <Vega spec={state.spec}
                                  data={(state.data as any)}
                                  signalListeners={{brush: handleSelect}}
                                  actions={false}/>
                        </Grid>
                        <Grid item md={12} display='flex' justifyContent='center'>
                            <Button onClick={handleFilterClick}>
                                Show Structures
                            </Button>
                            <Button onClick={handleSaveSelection}>
                                Save Selection
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={6} display='flex' alignItems='center'>
                    <MoleculeGallery selected={state.selected}/>
                </Grid>
                <Grid item md={6} display='flex' justifyContent='center'>
                    <div style={{ width: '200px' }}>
                        <a href='https://www.trident.bio/' target='_blank'>
                            <div dangerouslySetInnerHTML={{ __html: Logo() }} />
                        </a>
                    </div>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Histogram;