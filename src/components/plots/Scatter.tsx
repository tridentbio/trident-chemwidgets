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
    // X-Axis params
    xLabel?: string,
    xIsDate?: boolean,
    xDateFormat?: string,
    // Y-Axis params
    yLabel?: string,
    yIsDate?: boolean,
    yDateFormat?: string,
    // Hue params
    hueLabel?: string,
    hueType?: string,
    hueMin?: number,
    hueMax?: number,
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
    const xIsDate = props.xIsDate ? props.xIsDate : false;
    const xDateFormat = props.xDateFormat ? props.xDateFormat : undefined;

    const yLabel = props.yLabel ? props.yLabel : 'y';
    const yIsDate = props.yIsDate ? props.yIsDate : false;
    const yDateFormat = props.yDateFormat ? props.yDateFormat : undefined;

    // Hue param and data type
    const hueLabel = props.hueLabel ? props.hueLabel : undefined;
    const hueType = props.hueType ? props.hueType : undefined;
    const hueMin = props.hueMin ? props.hueMin : undefined;
    const hueMax = props.hueMax ? props.hueMax : undefined;

    const specs = scatterSpec(
        400, 400, xLabel, yLabel,
        hueLabel, hueType, hueMin, hueMax,
        xIsDate, xDateFormat, yIsDate, yDateFormat
    );

    const [state, setState] = useState<ScatterState>({
        data: props.data,
        spec: specs,
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
        xmin: number | Date,
        xmax: number | Date,
        ymin: number | Date,
        ymax: number | Date,
    ) => {
        // Update correctly the values for date types
        xmin = xIsDate ? new Date(xmin) : xmin;
        xmax = xIsDate ? new Date(xmax) : xmax;

        ymin = yIsDate ? new Date(ymin) : ymin;
        ymax = yIsDate ? new Date(ymax) : ymax;

        const filteredData = data.filter(datum => {
            const datumX = xIsDate ? new Date(datum.x) : datum.x;
            const datumY = yIsDate ? new Date(datum.y) : datum.y;

            return (
                (datumX >= xmin) &&
                (datumX <= xmax) &&
                (datumY >= ymin) &&
                (datumY <= ymax)
            )
        });
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