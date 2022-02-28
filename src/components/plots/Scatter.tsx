import { Button, Grid, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Vega, VisualizationSpec } from "react-vega";
import theme from "../../theme";
import { DataObject2D, Point2D } from '../../types/dataTypes';
import Logo from "../../utils/logo";
import initRDKit from "../../utils/rdkit";
import scatterSpec from "../specs/scatter_specs";
import tooltipOptions from "../tooltip/MoleculeSVGTooltip";
import MoleculeGallery from '../drawings/MoleculeGallery';

interface ScatterProps {
    data: DataObject2D,
    onChange?: (val: (number | undefined)[]) => void,
    xLabel?: string,
    yLabel?: string,
}

interface ScatterState {
    data: DataObject2D,
    spec: VisualizationSpec,
    xlim: [number, number],
    ylim: [number, number],
    selected: Point2D[],
    savedSelected: Point2D[],
}

const Scatter = (props: ScatterProps): JSX.Element => {

    const xLabel = props.xLabel ? props.xLabel : 'x';
    const yLabel = props.yLabel ? props.yLabel : 'y';

    const [state, setState] = useState<ScatterState>({
        data: props.data,
        spec: scatterSpec(400, 400, xLabel, yLabel),
        xlim: [NaN, NaN],
        ylim: [NaN, NaN],
        selected: [],
        savedSelected: [],
    });

    useEffect(() => {
        if (!(window as any).RDKit) {
            initRDKit();
        }
    }, []);

    const filterInterval = (
        data: Point2D[],
        xmin: number,
        xmax: number,
        ymin: number,
        ymax: number,
    ) => {
        const filteredData = data.filter(datum => (
            (datum.x >= xmin) &&
            (datum.x <= xmax) &&
            (datum.y >= ymin) &&
            (datum.y <= ymax)
        ));
        return filteredData;
    };

    const handleSelect = (...args: any[]) => {
        const limits = args[1];
        if (Object.keys(limits).length !== 0) {
            const xlim = args[1]['x'];
            const ylim = args[1]['y'];

            setState({
                ...state,
                xlim: xlim,
                ylim: ylim,
            });
        } else {
            setState({
                ...state,
                xlim: [NaN, NaN],
                ylim: [NaN, NaN],
                selected: []
            });
        }
    }

    const handleFilterClick = () => {
        const xlim = state.xlim;
        const ylim = state.ylim;
        const selected = filterInterval(state.data.points, ...xlim, ...ylim);
        setState({
            ...state,
            selected: selected,
        });
    };

    const handleSaveSelection = () => {
        const selected = filterInterval(state.data.points, ...state.xlim, ...state.ylim);
        setState({
            ...state,
            selected: selected,
            savedSelected: selected
        });

        if (props.onChange) {
            props.onChange(selected.map((element: Point2D) => {return element.index}));
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={2}>
                <Grid item md={6} justifyContent='center'>
                    <Grid container rowSpacing={2}>
                        <Grid item md={12} display='flex' justifyContent='center'>
                            <Vega spec={state.spec} data={(state.data as any)} 
                                  signalListeners={{ brush: handleSelect }}
                                  tooltip={tooltipOptions} />
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
                    <MoleculeGallery selected={state.selected} />
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
};

export default Scatter;