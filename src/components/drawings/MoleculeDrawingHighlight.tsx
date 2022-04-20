import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, styled,  MenuItem, TextField } from '@mui/material';
import initRDKit from '../../utils/rdkit';
import { ThemeProvider } from "@mui/system";
import theme from "../../theme";
import Logo from "../../utils/logo";
import { atomicNumberToName } from "../../utils/chem";
import * as d3 from 'd3';


const MoleculeContainer = styled('div')({
    '& svg ellipse': {
        fill: 'rgb(217, 213, 213)',
        stroke: 'rgb(217, 213, 213)',
        '&:hover': {
            fill: 'rgb(167 164 164)',
            stroke: 'rgb(167 164 164)',
        },
        '&.active': {
            fill: '#8BBEB2 !important',
            stroke: '#8BBEB2 !important'
        }
    }
});

interface MoleculeDrawingHighlightProps {
    smiles: string,
    allAtoms: boolean,
    atoms?: Array<number>,
    atomsData?: Array<{[key:string]: any}>,
    // TODO: add bond support
    // allBonds: boolean,
    // bonds?: Array<number>,

    width: number,
    height: number,

    id: string,

    colorColumns: string[]
}

interface MoleculeDetails {
    atoms: Array<number>,
    width: number,
    height: number,
}

interface DisplayData {
    type: string,
    index: number,
    data: {[key: string]: any}
}


const MoleculeDrawingHighlight = (props: MoleculeDrawingHighlightProps): JSX.Element => {

    const { smiles, height, width, allAtoms, atomsData, colorColumns } = props;
    // @ts-ignore
    const [rdKitLoaded, setRdKitLoaded] = useState(false);
    // @ts-ignore
    const [rdKitError, setRdKitError] = useState(false);
    const [colorBy, setColorBy] = useState('None');


    const [moleculeSvg, setMoleculeSvg] = useState('');
    const [displayData, setDisplayData] = useState<DisplayData | null>(null);
    const [atomsName, setAtomsName] = useState<string[]>([]);

    const getAllAtoms = (molecule: any) => {
        if (allAtoms) {
            const molecule_json = JSON.parse(molecule.get_json()).molecules[0];
            const names: string[] = [];
            const atomsIndices = molecule_json.atoms.map((atom: any, index: number) => {
                // Handle the name of each atom element
                if (atom['z'] === undefined) {
                    names.push('Carbon')
                } else {
                    names.push(atomicNumberToName(atom['z']))
                }
                return index;
            });
            setAtomsName(names);
            return atomsIndices;
        }
        return props?.atoms;
    };

    const drawMolecule = () => {
        const molecule = (window as any).RDKit.get_mol(smiles);
        const atomsList = getAllAtoms(molecule);
        const moleculeDetails: MoleculeDetails = {
            atoms: atomsList,
            width: width,
            height: height,
        };
        const svg = molecule.get_svg_with_highlights(JSON.stringify(moleculeDetails));

        setMoleculeSvg(svg);
        molecule.delete();

        const indexes = atomsData?.map((el, i) => i);
        const svgEl = d3.select(`#${props.id}`).select('svg');
        const allAtoms = svgEl.selectAll('ellipse');

        allAtoms
            .data((indexes as []))
            .attr('style', 'fill: rgb(217, 213, 213)')
            .on('click', (event, datum) => {
                allAtoms.classed('active', (element, j) => {
                    return j == datum;
                });
                setDisplayData({
                    type: 'Atom',
                    index: datum,
                    data: (atomsData ? atomsData[datum] : {})
                });
            });
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColorBy(event.target.value);
    };

    useEffect(() => {
        initRDKit().then(() => {
            setRdKitLoaded(true);
            drawMolecule();
        }).catch(() => {
            setRdKitError(true);
        });
    }, []);

    useEffect(() => {
        const svg = d3.select(`#${props.id}`).select('svg');

        if (colorBy == 'None') {
            const ellipsis = svg.selectAll('ellipse');
            ellipsis.attr('style', (d) => 'rgb(217, 213, 213)');
            return;
        }

        const columnData: number[] = [];
        const indexes: number[] = [];

        atomsData?.forEach((el, index) => {
            columnData.push(el[colorBy]);
            indexes.push(index);
        });

        const maxValue = columnData.reduce((a, b) => Math.max(a, b));
        const minValue = columnData.reduce((a, b) => Math.min(a, b), 0);
        
        const negativeColors = d3.scaleLinear<string>()
            .domain([0, Math.abs(minValue)])
            .range(['white', 'red']);
        const positiveColors = d3.scaleLinear<string>()
            .domain([0, (minValue != maxValue) ? maxValue : 1])
            .range(['white', 'green']);

        const ellipsis = svg.selectAll('ellipse').data(indexes);
        
        ellipsis.attr('style', (d) => {
            if (columnData[d] >= 0) {
                return `fill: ${positiveColors(columnData[d])}`;
            }
            return `fill: ${negativeColors(d)}`;
        }).on('click', (event, datum) => {
            ellipsis.classed('active', (element, j) => {
                return j == datum;
            });

            setDisplayData({
                type: 'Atom',
                index: datum,
                data: (atomsData ? atomsData[datum] : {})
            });
        });
    }, [colorBy]);

    return (
        <ThemeProvider theme={theme}>
            <Grid container mt={2} spacing={2} direction='row'>
                <Grid item sm={12} md={6} alignItems='center'
                        justifyContent='center'>
                    <Grid container spacing={2} direction='column'
                        alignItems='center'>
                        <Grid item xs={6} alignItems='center'
                            justifyContent='center'>
                            <Grid textAlign='center'>
                                <Typography variant='h5'>
                                    Molecule Display
                                </Typography>
                                <Typography variant='h6'>
                                    {smiles}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} alignItems='center'
                            justifyContent='center'>
                            <Paper elevation={3}>
                                <MoleculeContainer
                                    id={props.id}
                                    contentEditable='true'
                                    dangerouslySetInnerHTML={{
                                        __html: moleculeSvg
                                    }}>
                                </MoleculeContainer>
                            </Paper>
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
                <Grid item sm={12} md={6} alignItems='center' justifyContent='center' p={3}>
                    {displayData && (
                        <Paper elevation={3}>
                            <Grid container p={3}>
                                <Grid item sm={6}>
                                    <div>
                                        <Typography variant='h4'>
                                            {(displayData.type == 'Atom') ? 
                                                atomsName[displayData.index] : displayData.type}
                                        </Typography>
                                        <Typography color='text.secondary'>
                                            Atom • index: {displayData.index}
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item md={6}>
                                    <TextField
                                        fullWidth
                                        onChange={handleColorChange}
                                        defaultValue={'None'}
                                        size="small"
                                        select
                                        label='Color by'
                                    >
                                        <MenuItem value={'None'}>
                                            None
                                        </MenuItem>
                                        {colorColumns.map((column, index) =>
                                            <MenuItem value={column} key={index}>
                                                {column}
                                            </MenuItem>
                                        )}
                                    </TextField>
                                </Grid>
                                {Object.keys(displayData.data).map(key => (
                                    <Grid item sm={12} mt={3}>
                                        <div>
                                            <Typography variant='h6'>{key}</Typography>
                                            <p>
                                                {displayData.data[key]}
                                            </p>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default MoleculeDrawingHighlight;
