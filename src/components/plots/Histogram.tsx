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
}

interface HistogramState {
    data: DataObject1D,
    spec: VisualizationSpec,
    xlim: [number, number],
    selected: Point1D[],
    savedSelected: Point1D[],
}

const Histogram = (props: HistogramProps): JSX.Element => {

    const [state, setState] = useState<HistogramState>({
        data: props.data,
        spec: histogramSpec(400, 400, props.xLabel),
        xlim: [NaN, NaN],
        selected: [],
        savedSelected: [],
    });

    const filterInterval = (data: Point1D[], xMin: number, xMax: number) => {
        const filteredData = data.filter(datum => (
            (datum.x >= xMin) && (datum.x <= xMax)
        ));
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
            <Grid container sx={{marginTop: '10px'}} spacing={2}
                  direction='row' alignItems='center'>
                <Grid item sm={12} md={6} alignItems='center'
                      justifyContent='center'>
                    <Grid container spacing={2} direction='column'
                          alignItems='center'>
                        <Grid item xs={6} alignItems='center'
                              justifyContent='center'>
                            <Vega spec={state.spec}
                                  data={(state.data as any)}
                                  signalListeners={{brush: handleSelect}}
                                  actions={false}/>
                        </Grid>
                        <Grid sm={12}>
                            <Button onClick={handleFilterClick}>
                                Show Structures
                            </Button>
                            <Button onClick={handleSaveSelection}>
                                Save Selection
                            </Button>
                        </Grid>
                        <Grid container alignItems='center'
                              justifyContent='center' mt={2}>
                            <div style={{ width: '200px' }}>
                                <a href='https://www.trident.bio/' target='_blank'>
                                    <div dangerouslySetInnerHTML={{ __html: Logo() }} />
                                </a>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12} md={6} alignItems='center' justifyContent='center'>
                    <MoleculeGallery selected={state.selected} />
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Histogram;